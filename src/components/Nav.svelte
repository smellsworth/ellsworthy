<script>
  export let segment
</script>

<style lang="scss">
  @import "responsive";

  nav {
    position: relative;
    display: flex;
    align-items: center;
    padding: 24px 0;

    @include phone {
      padding: 16px 0;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0px;
      height: 1px;
      background-color: var(--border_color);
      opacity: 0;
    }
  }

  .nav_border {
    &::after {
      opacity: 1;
    }
  }

  .title {
    position: relative;
    font-size: 36px;
    text-decoration: none;
    color: var(--text);
    transition: 200ms;

    @include phone {
      font-size: 26px;
    }
    @include widthLessThan(400px) {
      font-size: 20px;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 1px;
      background-color: var(--text);
      opacity: 0;
      transform: scaleX(0.95);
      transition: 200ms;
    }

    &:focus {
      color: var(--cta_background);
      &::after {
        background-color: var(--cta_background);
        opacity: 1;
        transform: scaleX(1);
      }
    }

    &:hover {
      &::after {
        opacity: 1;
        transform: scaleX(1);
      }
    }
  }

  .empty-space {
    flex: 1;
  }

  ul {
    padding-left: 12px;
    display: flex;
    list-style-type: none;
  }

  .link {
    position: relative;
    padding: 8px 0;
    margin-left: 24px;
    text-decoration: none;
    font-size: 16px;
    color: var(--text);
    transition: 200ms;

    @include phone {
      margin-left: 16px;
      font-size: 14px;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 1px;
      background-color: var(--text);
      opacity: 0;
      transform: scaleX(0.95);
      transition: 200ms;
    }

    &:focus {
      color: var(--cta_background);
      &::after {
        background-color: var(--cta_background);
        opacity: 1;
        transform: scaleX(1);
      }
    }

    &:hover {
      &::after {
        opacity: 1;
        transform: scaleX(1);
      }
    }
  }

  [aria-current] {
    font-weight: 600;

    &::after {
      opacity: 1;
      transform: scaleX(1);
    }
  }
</style>

<nav class:nav_border="{!!segment}">
  <a class="title" href="/">Ellsworthy</a>
  <span class="empty-space"></span>
  <ul>
    <li>
      <a
        class="link"
        rel="prefetch"
        aria-current="{segment === 'blog' ? 'page' : undefined}"
        href="blog"
      >
        Essays
      </a>
    </li>
    <li>
      <a
        class="link"
        rel="prefetch"
        aria-current="{segment === 'projects' ? 'page' : undefined}"
        href="projects"
      >
        Projects
      </a>
    </li>
  </ul>
</nav>
