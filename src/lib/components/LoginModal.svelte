<script lang="ts">
	import { Button, Input } from '$lib/components/ui';
	import { checkPassword } from '$lib/stores/auth';

	let password = $state('');
	let error = $state('');
	let isShaking = $state(false);

	function handleSubmit() {
		if (checkPassword(password)) {
			error = '';
		} else {
			error = 'Incorrect password';
			password = '';
			isShaking = true;
			setTimeout(() => {
				isShaking = false;
			}, 500);
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	}
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 p-4">
	<div
		class="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 {isShaking ? 'animate-shake' : ''}"
	>
		<div class="text-center mb-8">
			<div class="inline-block p-4 bg-primary-100 rounded-full mb-4">
				<svg
					class="w-12 h-12 text-primary-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
					/>
				</svg>
			</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-2" style="font-family: 'Anton', sans-serif;">
				B1 BIRTHDAYS
			</h1>
			<p class="text-gray-600">Enter password to continue</p>
		</div>

		<div class="space-y-4">
			<Input
				bind:value={password}
				type="password"
				placeholder="Enter password"
				error={error}
				id="password-input"
				onkeydown={handleKeyDown}
				autofocus
			/>

			<Button onclick={handleSubmit} class="w-full">
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
					/>
				</svg>
				Unlock
			</Button>
		</div>

		<div class="mt-6 text-center text-sm text-gray-500">
			<p>Boners Living Community</p>
		</div>
	</div>
</div>

<style>
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translateX(-10px);
		}
		20%,
		40%,
		60%,
		80% {
			transform: translateX(10px);
		}
	}

	.animate-shake {
		animation: shake 0.5s;
	}
</style>

