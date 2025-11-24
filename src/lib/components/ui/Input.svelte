<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label?: string;
		error?: string;
		helperText?: string;
		value?: string;
	}

	let { label, error, helperText, value = $bindable(''), class: className = '', ...rest }: Props = $props();

	const inputClasses = `block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors ${
		error
			? 'border-red-300 focus:border-red-500 focus:ring-red-500'
			: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
	} ${className}`;
</script>

<div class="w-full">
	{#if label}
		<label for={rest.id} class="block text-sm font-medium text-gray-700 mb-1">
			{label}
		</label>
	{/if}
	<input bind:value class={inputClasses} {...rest} />
	{#if error}
		<p class="mt-1 text-sm text-red-600">{error}</p>
	{:else if helperText}
		<p class="mt-1 text-sm text-gray-500">{helperText}</p>
	{/if}
</div>

