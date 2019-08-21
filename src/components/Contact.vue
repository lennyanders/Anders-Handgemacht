<template>
  <form @submit.prevent="sendMail" class="contact">
    <label class="contact__label" for="name">Name</label>
    <input
      class="contact__input"
      type="text"
      id="name"
      v-model="name"
      placeholder=" "
      required
      minlength="3"
    />

    <label class="contact__label" for="email">E-Mail</label>
    <input
      class="contact__input"
      type="email"
      name=""
      id="email"
      v-model="email"
      placeholder=" "
      required
      minlength="5"
    />

    <label class="contact__label" for="message">Nachricht</label>
    <textarea
      class="contact__input contact__input--message"
      id="message"
      v-model="message"
      placeholder=" "
      minlength="50"
      required
    ></textarea>

    <label class="contact__label">
      <input class="contact__checkbox" type="checkbox" required />
      <div class="contact__checkbox-text">
        Die abgesendeten Daten werden nur zum Zweck der Bearbeitung Ihres
        Anliegens verarbeitet. Weitere Informationen finden Sie in unserer
        <router-link to="/Datenschutzerklaerung"
          >Datenschutzerklärung</router-link
        >.
      </div>
    </label>

    <button class="contact__submit" type="submit">Nachricht Senden</button>

    <template v-if="submitted">
      <div class="contact__info contact__info--sending" v-if="send === 0">
        Ihre nachricht wird versendet...
      </div>
      <div class="contact__info contact__info--send" v-else-if="send === 1">
        Ihre Nachricht wurde versandt, vielen Dank!
      </div>
      <div class="contact__info contact__info--failed" v-else>
        Leider konnte Ihre Nachricht nicht versandt werden.
      </div>
    </template>
  </form>
</template>

<script>
  export default {
    name: 'contact',
    data() {
      return {
        name: '',
        email: '',
        message: '',
        submitted: false,
        send: 0
        //send: 0 = processing; 1 = success; 2 = failed
      };
    },
    methods: {
      sendMail() {
        this.submitted = true;
        this.send = 0;

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.send = 1;
              this.name = '';
              this.email = '';
              this.message = '';
            } else {
              this.send = 2;
            }
          }
        });
        xhr.open('POST', 'contact.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`name=${this.name}&email=${this.email}&message=${this.message}`);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .contact {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;

    &__input {
      width: 100%;
      margin-bottom: 20px;
      background-color: #eee;
      border: 0;
      padding: 10px 38px 10px 15px;
      background-position: right 7px top 7px;
      background-repeat: no-repeat;
      background-size: 24px;

      &--message {
        resize: vertical;
        min-height: 15em;
      }

      &:not(:placeholder-shown) {
        &:invalid {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23f44336' viewBox='0 0 24 24'%3E %3Cpath d='M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12 6.47 2 12 2m3.59 5L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z'/%3E %3C/svg%3E");
        }
        &:valid {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23009688' viewBox='0 0 24 24'%3E %3Cpath d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E %3C/svg%3E");
        }
      }
    }

    &__label {
      display: block;
      margin-bottom: 5px;
    }

    &__checkbox {
      opacity: 0;
      position: absolute;

      &:focus + &-text::before {
        outline: 1px dotted #212121;
        outline: 5px auto -webkit-focus-ring-color;
      }

      &:checked + &-text::after {
        opacity: 1;
      }
    }

    &__checkbox-text {
      position: relative;
      margin-left: 30px;

      &::before {
        content: '';
        position: absolute;
        display: block;
        left: -30px;
        top: 0;
        width: 20px;
        height: 20px;
        background-color: #eee;
        cursor: pointer;
      }

      &::after {
        content: '';
        position: absolute;
        display: block;
        left: -27px;
        top: 3px;
        width: 14px;
        height: 14px;
        background: #666;
        opacity: 0;
        transition: opacity 0.1s ease;
        cursor: pointer;
      }
    }

    &__submit {
      padding: 10px 15px;
      margin-top: 20px;
      background-color: #eee;
      color: #666;
      border: 0;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;

      &:hover {
        color: #000;
        box-shadow: 0 0 5px -3px rgba(0, 0, 0, 0.2);
      }
    }

    &__info {
      margin-top: 20px;
      padding: 10px 15px;

      &--sending {
        color: #006064;
        background-color: #00bcd4;
        background-image: linear-gradient(
          90deg,
          transparent 0,
          rgba(0, 0, 0, 0.066) 50%,
          transparent 100%
        );
        background-size: 200px;
        background-repeat: no-repeat;
        background-position: -200px;
        animation: sending 2s infinite;
      }

      &--send {
        color: #001a15;
        background-color: #009688;
      }

      &--failed {
        color: #2c0707;
        background-color: #f44336;
      }
    }
  }

  @keyframes sending {
    to {
      background-position: calc(100% + 200px);
    }
  }
</style>

