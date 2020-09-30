<style lang="scss">
  @import "mixins";
  @import "responsive";

  .container {
    display: flex;
    align-items: center;
    border: 1px solid var(--border_color);

    @include widthLessThan(530px) {
      flex-direction: column;
      padding: 8px;
    }
  }

  img {
    width: 202px;
    height: 170px;
    margin-right: 24px;

    @include phone {
      width: 150px;
      height: 126px;
      margin-right: 16px;
    }

    @include widthLessThan(530px) {
      width: 120px;
      height: 101px;
      margin-right: 0;
      margin-bottom: 8px;
    }
  }

  p {
    margin: 12px 0;

    @include widthLessThan(530px) {
      margin: 8px 0;
    }
  }

  a {
    @include linkRules;
  }
</style>

<!-- use prettier ignore to avoid line breaks in paragraph which add unexpected spaces -->
<!-- prettier-ignore -->
<div class="container">
  <img alt="Matt illustration" src="half-matt.png" />
  <div>
    <p>Trying to figure out where/what to eat.</p>
    <p>
      COO <a href="https://pandascore.co/" target="_blank" rel="noopener">@PandaScore</a>. Food, Esports, Business.
    </p>
    <p>
      Ex-Partner<a href="https://500.co/" target="_blank" rel="noopener">@500startups</a>.
    </p>
    <p>Bad opinions are probably mine. 食い倒れ He/him.</p>
  </div>
</div>
