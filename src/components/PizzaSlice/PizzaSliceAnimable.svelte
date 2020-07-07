<script>
  export let status

  $: not_started = status === "not_started"
  $: preparing = status === "preparing"
  $: added = status === "added"
</script>

<style lang="scss">
  svg path {
    transition: 500ms;
  }

  .illustration_empty {
    .tomato-sauce {
      transition-delay: 600ms;
      transform: translateY(65px);
    }
    .crust {
      transition-delay: 300ms;
      fill-opacity: 0;
    }
    .cheese {
      transition-delay: 300ms;
      transform: translateY(50px);
    }
    .tomato-left {
      transition-delay: 0ms;
      transform: translate3d(20px, -20px, 0);
      fill-opacity: 0;
    }
    .tomato-middle {
      transition-delay: 0ms;
      transform: translate3d(20px, -20px, 0);
      fill-opacity: 0;
    }
    .tomato-right {
      transition-delay: 0ms;
      transform: translate3d(20px, -20px, 0);
      fill-opacity: 0;
    }
    .tomato-bottom {
      transition-delay: 0ms;
      transform: translate3d(20px, -20px, 0);
      fill-opacity: 0;
    }
    .leaf-top {
      transition-delay: 0ms;
      transform: translate3d(20px, -20px, 0);
      fill-opacity: 0;
    }
    .leaf-left {
      transition-delay: 0ms;
      transform: translate3d(20px, -20px, 0);
      fill-opacity: 0;
    }
    .leaf-right {
      transition-delay: 0ms;
      transform: translate3d(20px, -20px, 0);
      fill-opacity: 0;
    }
  }

  .tomato-sauce {
    transition-delay: 0ms;
  }
  .crust {
    transition-delay: 600ms;
  }
  .cheese {
    transition-delay: 500ms;
  }
  .tomato-left {
    transition-delay: 950ms;
  }
  .tomato-middle {
    transition-delay: 1050ms;
  }
  .tomato-right {
    transition-delay: 1000ms;
  }
  .tomato-bottom {
    transition-delay: 1050ms;
  }
  .leaf-top {
    transition-delay: 1000ms;
  }
  .leaf-left {
    transition-delay: 1050ms;
  }
  .leaf-right {
    transition-delay: 950ms;
  }
</style>

<svg
  class="illustration"
  class:illustration_empty="{not_started}"
  width="60"
  height="63"
  viewBox="0 0 60 63"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g filter="url(#filter0_d)">
    <!-- tomato sauce -->
    <path
      class="tomato-sauce"
      d="M29.7522 56.9999L2 8.02204C24 -5.50006 49 2 58 8.02204L29.7522 56.9999Z"
      fill="#D0522E"
    ></path>
  </g>
  <!-- crust -->
  <path
    class="crust"
    d="M4.5 12.5L2 8.02203C24 -5.50007 49 1.99999 58 8.02203L55.5 12.5C55.5 12.5
    51 7 45 7C39 7 30.5 6 26 5.5C21.5 5 17 5.54406 14 8.02203C11 10.5 4.5 12.5
    4.5 12.5Z"
    fill="#F6C879"
  ></path>

  <!-- cheese -->
  <path
    class="cheese"
    d="M8 18.5C11.2812 16.4832 14 13.5 18.5 14.5C20.0582 15.2791 25 14.9999 31.5
    13C38 11.0001 37.9238 15.6609 42.5 15.9999C47.1055 16.3411 49.6552 16.9311
    52 18.5C52 18.5 49.3676 24.5 48.5 26C47.6324 27.5 44.164 32.0948 43.332
    33.5C42.5 34.9052 40.6057 39 40 40C39.3943 41 37.5623 43.394 36.3976
    45.5C35.1765 47.7081 34.0644 50.5 33.5 51.5C32.9356 52.5 29.7522 56.9999
    29.7522 56.9999C29.7522 56.9999 27 54 26.5 53C26 52 23.1576 45.328 22.5
    44.164C21.8424 43 18.6401 38.1329 18 37C17.3599 35.8671 15.3449 31.5 14.7799
    30.5C14.2149 29.5 11.3475 25 10.5 23.5C9.93501 22.5 8 18.5 8 18.5Z"
    fill="#FADD87"
  ></path>

  <!-- tomato left -->
  <path
    class="tomato-left"
    d="M17.5 25.5C17.5 28.2614 17.2614 30 14.5 30C13.5 28.5 12.5 27 11 24.5C11
    21.7386 11.7386 21 14.5 21C17.2614 21 17.5 22.7386 17.5 25.5Z"
    fill="#ED855E"
  ></path>
  <!-- tomato middle -->
  <path
    class="tomato-middle"
    d="M36.5 27.5C36.5 30.2614 33.6732 31.991 30.9118 31.991C28.1504 31.991 26
    32.2614 26 29.5C26 26.7386 27.6504 24 30.4118 24C33.1732 24 36.5 24.7386
    36.5 27.5Z"
    fill="#ED855E"
  ></path>
  <!-- tomato right -->
  <path
    class="tomato-right"
    d="M49.509 24.5C48.509 26.5 47.509 28 46.009 29.5C43.2475 29.5 41.009
    28.2614 41.009 25.5C41.009 22.7386 41.7475 21.5 44.509 21.5C47.2704 21.5
    49.009 22.0001 49.509 24.5Z"
    fill="#ED855E"
  ></path>
  <!-- tomato bottom -->
  <path
    class="tomato-bottom"
    d="M32.5 44.5C32.5 47.2614 31.2614 47.5 28.5 47.5C25.7386 47.5 24 46.2614 24
    43.5C24 40.7386 27.2386 39 30 39C32.7614 39 32.5 41.7386 32.5 44.5Z"
    fill="#ED855E"
  ></path>

  <!-- leaf top -->
  <path
    class="leaf-top"
    d="M21.4008 22.5258C21.1206 22.3097 20.9404 20.2262 22.1004 18.7226C23.2604
    17.2189 24.6732 16.3644 25.6015 17.0806C26.5299 17.7967 25.7818 19.164
    24.6218 20.6677C23.4617 22.1714 21.6809 22.742 21.4008 22.5258Z"
    fill="#88993F"
  ></path>
  <!-- leaf left -->
  <path
    class="leaf-left"
    d="M23.6508 36.8876C23.3164 37.0031 21.476 36.01 20.8561 34.2149C20.2361
    32.4198 20.2975 30.7699 21.4057 30.3871C22.514 30.0043 23.2461 31.3802
    23.8661 33.1753C24.486 34.9704 23.9853 36.7721 23.6508 36.8876Z"
    fill="#88993F"
  ></path>
  <!-- leaf right -->
  <path
    class="leaf-right"
    d="M33.1414 35.7603C33.1768 35.4082 34.85 34.1538 36.7397 34.3436C38.6293
    34.5333 40.1015 35.2809 39.9843 36.4475C39.8672 37.6141 38.3111 37.7019
    36.4214 37.5121C34.5318 37.3223 33.1061 36.1123 33.1414 35.7603Z"
    fill="#88993F"
  ></path>
  <defs>
    <filter
      id="filter0_d"
      x="0"
      y="0.440308"
      width="60"
      height="62.5596"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
      ></feColorMatrix>
      <feOffset dy="4"></feOffset>
      <feGaussianBlur stdDeviation="1"></feGaussianBlur>
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
      ></feColorMatrix>
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow"
      ></feBlend>
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect1_dropShadow"
        result="shape"
      ></feBlend>
    </filter>
  </defs>
</svg>
