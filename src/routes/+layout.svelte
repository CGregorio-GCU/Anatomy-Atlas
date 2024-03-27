<script>
	import '../app.pcss';
	import {Toaster} from "$lib/components/ui/sonner"
</script>

<style>
	:global(body){
		font-family: "Nunito", sans-serif;
	}
</style>

<Toaster />
<slot />
