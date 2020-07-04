<script>
  export let title
  export let urlPrefix
  export let posts
</script>

<style lang="scss">
  @import "responsive";

  h2 {
    margin-top: 48px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border_color);
    text-transform: uppercase;
    font-size: 17px;

    @include phone {
      margin-top: 32px;
      margin-bottom: 12px;
      font-size: 15px;
    }
  }

  ul {
    margin-bottom: 32px;
    padding: 0 16px;
    list-style-type: "* ";

    @include phone {
      padding: 0 12px;
    }
  }

  li {
    margin-bottom: 12px;
    font-size: 15px;

    @include phone {
      margin-bottom: 8px;
      font-size: 13px;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: 200ms;

    &:hover {
      text-decoration: underline;
    }

    &:focus {
      text-decoration: underline;
      color: var(--cta_background);
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
