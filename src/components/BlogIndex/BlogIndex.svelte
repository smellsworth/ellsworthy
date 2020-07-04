<script>
  export let title
  export let urlPrefix
  export let posts
</script>

<style lang="scss">
  h2 {
    margin-top: 48px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border_color);
    text-transform: uppercase;
    margin-bottom: 16px;
    font-size: 17px;
  }

  ul {
    margin-bottom: 32px;
    padding: 0 16px;
    list-style-type: "* ";
  }

  li {
    margin-bottom: 12px;
    font-size: 15px;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>

<h2>{title}</h2>

<ul>
  {#each posts as post}
    <li>
      <a rel="prefetch" href="{urlPrefix}/{post.slug}">{post.title}</a>
    </li>
  {/each}
</ul>
