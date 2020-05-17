<script>
  import Heading from "./Heading.svelte"
  import Paragraph from "./Paragraph.svelte"
  import List from "./List.svelte"
  import Preformatted from "./Preformatted.svelte"
  import Image from "./Image.svelte"
  import Embed from "./Embed.svelte"

  export let node
</script>

{#if node.type === 'heading'}
  <Heading {node} />
{:else if node.type === 'paragraph'}
  <Paragraph {node} />
{:else if node.type === 'list'}
  <List {node} />
{:else if node.type === 'preformatted'}
  <Preformatted {node} />
{:else if node.type === 'image'}
  <Image {node} />
{:else if node.type === 'embed'}
  <Embed {node} />
{/if}
