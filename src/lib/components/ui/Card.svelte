<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		padding?: 'none' | 'sm' | 'md' | 'lg';
		hover?: boolean;
		children: Snippet;
	}

	let { padding = 'md', hover = false, class: className = '', children, ...rest }: Props = $props();

	const baseStyles = 'bg-white rounded-lg border border-gray-200 shadow-sm';
	const hoverStyles = hover ? 'hover:shadow-md transition-shadow cursor-pointer' : '';

	const paddings = {
		none: '',
		sm: 'p-3',
		md: 'p-4',
		lg: 'p-6'
	};

	const classes = `${baseStyles} ${hoverStyles} ${paddings[padding]} ${className}`;
</script>

<div class={classes} {...rest}>
	{@render children()}
</div>

