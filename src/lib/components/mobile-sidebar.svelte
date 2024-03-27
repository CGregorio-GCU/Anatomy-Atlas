<script>
    import { Menu } from "lucide-svelte";
    import {
        Sheet,
        SheetContent,
        SheetTrigger
    } from "$lib/components/ui/sheet";

    import Sidebar from "./sidebar.svelte"
</script>

<Sheet>
    <SheetTrigger>
        <Menu class="text-white" />
    </SheetTrigger>
    <SheetContent class="p-0 z-[100]" side="left">
        <Sidebar />
    </SheetContent>
</Sheet>