<style lang="scss">
  @import "mixins";

  .container {
    display: flex;
    align-items: center;
    border: 1px solid var(--border_color);
  }

  img {
    width: 202px;
    margin-right: 24px;
  }

  p {
    margin: 12px 0;
  }

  a {
    @include linkRules;
  }
</style>

<div class="container">
  <img alt="Success Kid" src="half-matt.png" />
  <div>
    <p>Trying to figure out where/what to eat.</p>
    <p>
      COO
      <a href="https://pandascore.co/" target="_blank" rel="noopener">
        @PandaScore
      </a>
      . Food, Esports, Business.
    </p>
    <p>
      Ex-Partner
      <a href="https://500.co/" target="_blank" rel="noopener">@500startups</a>
      .
    </p>
    <p>Bad opinions are probably mine. 食い倒れ He/him.</p>
  </div>
</div>
