<script>
  import Heading from "./Heading.svelte"
  import Paragraph from "./Paragraph.svelte"
  import List from "./List.svelte"

  export let node
</script>

{#if node.type === 'heading'}
  <Heading {node} />
{:else if node.type === 'paragraph'}
  <Paragraph {node} />
{:else if node.type === 'list'}
  <List {node} />
{/if}
