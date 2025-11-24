<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
		size?: 'sm' | 'md';
		children: Snippet;
	}

	let { variant = 'default', size = 'md', class: className = '', children, ...rest }: Props = $props();

	const baseStyles = 'inline-flex items-center font-medium rounded-full';

	const variants = {
		default: 'bg-gray-100 text-gray-800',
		primary: 'bg-primary-100 text-primary-800',
		success: 'bg-green-100 text-green-800',
		warning: 'bg-yellow-100 text-yellow-800',
		danger: 'bg-red-100 text-red-800'
	};

	const sizes = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-2.5 py-0.5 text-sm'
	};

	const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
</script>

<span class={classes} {...rest}>
	{@render children()}
</span>

