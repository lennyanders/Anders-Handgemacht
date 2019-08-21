<template>
  <main class="main">
    <hero
      :image="require('../assets/hero.jpg')"
      :image-tablet="require('../assets/hero-tablet.jpg')"
      :text="heroText"
    />
    <contact />
  </main>
</template>

<script>
  // @ is an alias to /src
  import Hero from '@/components/Hero.vue';
  import Contact from '@/components/Contact.vue';

  export default {
    name: 'home',
    components: {
      Hero,
      Contact
    },
    data() {
      return {
        heroText: `<h1>Herzlich willkommen bei Anders Handgemacht</h1>
            <p>
              Ob formschöne Dinge aus altem Holz, oder Alltagsgegenständen neues Leben einzuhauchen – wir sind ein junges Familienunternehmen, das es sich zur Aufgabe gemacht hat, <em>Wohnen</em> zum <em>Zuhause</em> zu machen. Wichtig ist es uns dabei, umweltschonend zu arbeiten, deshalb entscheiden wir uns bewusst für Materialien, die eine Geschichte erzählen. Dadurch entstehen fast immer Unikate, kein Teil ist wie das andere.
            </p>
            <span>Gerne beraten wir Sie und gehen auf Ihre Wünsche ein!</span>
          `
      };
    }
  };
</script>