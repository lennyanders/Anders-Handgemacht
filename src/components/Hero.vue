<template>
  <header class="hero" :class="{ 'hero--show': imageLoaded }">
    <picture class="hero__image">
      <source
        media="(min-width: 768px) and (max-width: 1080px)"
        :srcset="imageTablet"
      />
      <img :src="image" alt="" class="hero__img" ref="image" />
    </picture>

    <div class="hero__text" v-html="text"></div>

    <div
      class="hero__scroll-down"
      :class="{ 'hero__scroll-down--hidden': scrollDownInisible }"
    ></div>
  </header>
</template>

<script>
  export default {
    name: 'Hero',
    props: ['image', 'image-tablet', 'text'],
    data() {
      return {
        imageLoaded: false,
        scrollDownInisible: window.scrollY > 150 ? true : false
      };
    },
    mounted() {
      this.$refs.image.addEventListener('load', () => {
        this.imageLoaded = true;
      });
      window.addEventListener('scroll', () => {
        this.scrollDownInisible = window.scrollY > 150 ? true : false;
      });
    }
  };
</script>

<style scoped lang="scss">
  .hero {
    position: relative;
    min-height: calc(100vh - #{150px + 30px});
    margin-bottom: 30px;

    @media screen and (min-width: 768px) {
      min-height: calc(100vh - #{150px + 80px});
      margin-bottom: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 180px;
    }

    &--show {
      .hero {
        &__image,
        &__text {
          visibility: visible;
          animation: start 1.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
      }
    }

    &__image,
    &__text {
      width: 100%;
      margin-top: 20px;
      visibility: hidden;

      @media screen and (min-width: 768px) {
        margin-top: 0;
        width: 48%;
      }
    }

    &__scroll-down {
      position: absolute;
      bottom: 25px;
      left: 50%;
      margin-left: -15px;
      width: 30px;
      height: 50px;
      border-radius: 15px;
      border: 2px solid #000;
      transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      display: none;

      @media screen and (min-width: 768px) {
        display: block;
      }

      &:not(&--hidden) {
        animation: fadeIn 3s 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) backwards;
      }

      &--hidden {
        opacity: 0;
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 10px;
        left: 10px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #000;
        animation: scroll-down 1.33s cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
  }

  @keyframes start {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes scroll-down {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    33% {
      opacity: 1;
    }
    100% {
      transform: translateY(20px);
      opacity: 0;
    }
  }
</style>
