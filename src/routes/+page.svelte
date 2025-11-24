<script lang="ts">
	import { onMount } from 'svelte';
	import type { Member, CreateMemberInput, UpdateMemberInput, UpcomingBirthday } from '$lib/types';
	import MemberList from '$lib/components/MemberList.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import GradYearFilter from '$lib/components/GradYearFilter.svelte';
	import BirthdayWidget from '$lib/components/BirthdayWidget.svelte';
	import MemberForm from '$lib/components/MemberForm.svelte';
	import { Modal, Button } from '$lib/components/ui';

	let members = $state<Member[]>([]);
	let birthdays = $state<UpcomingBirthday[]>([]);
	let searchQuery = $state('');
	let selectedGradYear = $state<string | null>(null);
	let isLoading = $state(true);
	let showAddModal = $state(false);
	let showEditModal = $state(false);
	let editingMember = $state<Member | null>(null);

	const filteredMembers = $derived(() => {
		let filtered = members;

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter((member) => member.name.toLowerCase().includes(query));
		}

		// Filter by graduation year
		if (selectedGradYear) {
			filtered = filtered.filter((member) => member.year_group === selectedGradYear);
		}

		return filtered;
	});

	onMount(async () => {
		await Promise.all([loadMembers(), loadBirthdays()]);
		isLoading = false;
	});

	async function loadMembers() {
		try {
			const response = await fetch('/api/members');
			const data = await response.json();
			if (data.members) {
				members = data.members;
			}
		} catch (error) {
			console.error('Failed to load members:', error);
		}
	}

	async function loadBirthdays() {
		try {
			const response = await fetch('/api/members/birthdays?days=30');
			const data = await response.json();
			if (data.birthdays) {
				birthdays = data.birthdays;
			}
		} catch (error) {
			console.error('Failed to load birthdays:', error);
		}
	}

	async function handleCreateMember(data: CreateMemberInput) {
		try {
			const response = await fetch('/api/members', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			if (response.ok) {
				await Promise.all([loadMembers(), loadBirthdays()]);
				showAddModal = false;
			}
		} catch (error) {
			console.error('Failed to create member:', error);
		}
	}

	async function handleUpdateMember(data: UpdateMemberInput) {
		if (!editingMember) return;

		try {
			const response = await fetch(`/api/members/${editingMember.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			if (response.ok) {
				await Promise.all([loadMembers(), loadBirthdays()]);
				showEditModal = false;
				editingMember = null;
			}
		} catch (error) {
			console.error('Failed to update member:', error);
		}
	}

	async function handleDeleteMember() {
		if (!editingMember) return;

		if (!confirm(`Are you sure you want to delete ${editingMember.name}?`)) {
			return;
		}

		try {
			const response = await fetch(`/api/members/${editingMember.id}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				await Promise.all([loadMembers(), loadBirthdays()]);
				showEditModal = false;
				editingMember = null;
			}
		} catch (error) {
			console.error('Failed to delete member:', error);
		}
	}

	function openEditModal(member: Member) {
		editingMember = member;
		showEditModal = true;
	}
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white border-b border-gray-200 sticky top-0 z-10">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-primary-600" style="font-family: 'Anton', sans-serif;">B1 BIRTHDAYS</h1>
				<p class="text-sm text-gray-600 mt-1">Boners Living Community</p>
			</div>
				<Button onclick={() => (showAddModal = true)}>
					<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v16m8-8H4"
						/>
					</svg>
					Add Member
				</Button>
			</div>
		</div>
	</header>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{#if isLoading}
			<div class="flex items-center justify-center py-12">
				<div class="text-center">
					<div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
					<p class="mt-4 text-gray-600">Loading members...</p>
				</div>
			</div>
		{:else}
			<div class="space-y-6">
				<!-- Birthday Widget -->
				<BirthdayWidget {birthdays} />

				<!-- Search and Filter Controls -->
				<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
					<SearchBar bind:value={searchQuery} />
					<GradYearFilter bind:selectedYear={selectedGradYear} />
				</div>

				<!-- Member Count -->
				<div class="flex items-center justify-between">
					<p class="text-sm text-gray-600">
						Showing {filteredMembers().length} of {members.length} members
					</p>
				</div>

				<!-- Member List -->
				<MemberList
					members={filteredMembers()}
					onMemberClick={openEditModal}
					groupByGradYear={!selectedGradYear && !searchQuery}
				/>
			</div>
		{/if}
	</main>
</div>

<!-- Add Member Modal -->
<Modal open={showAddModal} onClose={() => (showAddModal = false)} title="Add New Member">
	<MemberForm onSubmit={(data) => handleCreateMember(data as CreateMemberInput)} onCancel={() => (showAddModal = false)} />
</Modal>

<!-- Edit Member Modal -->
<Modal open={showEditModal} onClose={() => { showEditModal = false; editingMember = null; }} title="Edit Member">
	{#if editingMember}
		<MemberForm
			member={editingMember}
			onSubmit={handleUpdateMember}
			onCancel={() => { showEditModal = false; editingMember = null; }}
		/>
		<div class="mt-4 pt-4 border-t border-gray-200">
			<Button variant="danger" onclick={handleDeleteMember} size="sm">
				Delete Member
			</Button>
		</div>
	{/if}
</Modal>
