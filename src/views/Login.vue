<template>
  <div>
    <div class="c-login">
      <header>
        <h1>
          JOIN LEAGUE SANDBOX NOW
        </h1>
        <h4>
          Please gank top
        </h4>
        <div class="c-divider">
          <img src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/signup/en_GB/0e436452d44f9a739dfe56d0dffe6c3ca02e63b8/assets/en_GB/assets/divider.png" alt="divide">
        </div>
      </header>
      <div class="c-login-form">
        <form @submit.prevent="connect()">
          <div class="c-loader" v-if="false">
            <div class="c-spinner">
            </div>
          </div>
          <IconSelector :onChange="changeIcon" />
          <div class="c-input" style="width: 310px;float: right;">
            <label>
              Summoner name
            </label>
            <input type="text"
                    v-model="username" />
          </div>
          <div class="c-input">
            <label>
              Host
            </label>
            <input type="text"
                    v-model="host" />
          </div>
          <div class="c-input">
            <label>
              Port
            </label>
            <input type="text"
                    v-model="port" />
          </div>
          <div class="c-button">
            <Button text="Login" />
          </div>
        </form>
        <div class="c-news">
          <h2>Latest News:</h2>
          <div class="c-news_wrapper">
            <div class="c-news-item">
              <h3>News Titel</h3>
              <p>News Description</p>
            </div>
            <div class="c-news-item">
              <h3>News Titel</h3>
              <p>News Description</p>
            </div>
            <div class="c-news-item">
              <h3>News Titel</h3>
              <p>News Description</p>
            </div>
            <div class="c-news-item">
              <h3>News Titel</h3>
              <p>News Description</p>
            </div>
            <div class="c-news-item">
              <h3>News Titel</h3>
              <p>News Description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="c-version">
      Version 4.20
    </div>
    <div class="c-background__video">
      <video autoplay="autoplay" loop="loop" muted="muted" :src="splashVideo" style="width: auto; height: auto; min-height: 88vh; min-width: 100vw; position: absolute; top: 11.3889%; left: 70.3906%; transform: translate(-70.3906%, -11.3889%); z-index: -1;"></video>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import IconSelector from '@/components/IconSelector.vue';
import { RANDOM_SPLASHSCREEN } from '../assets/staticData';

@Component({
  components: {
    Button,
    IconSelector,
  },
})
export default class Login extends Vue {
  private path!: string;
  private username!: string;
  private host!: string;
  private port!: string;
  private splashVideos!: string[];
  private iconId!: number;

  public data() {
    return {
      username: localStorage.getItem('username'),
      iconId: 0,
      host: localStorage.getItem('host'),
      port: localStorage.getItem('port'),
      path: localStorage.getItem('path'),
      splashVideo: RANDOM_SPLASHSCREEN,
    };
  }

  public async onDone(result: any) {
    localStorage.setItem('token-lobby', result.data.connect.token);
    this.$store.state.logged = true;
    this.redirect();
  }

  public connect(callback: any) {
    const uri = `http://${this.host}:${this.port}/graphql`;
    // Save creds for faster login
    localStorage.setItem('path', this.path);
    localStorage.setItem('username', this.username);
    localStorage.setItem('host', this.host);
    localStorage.setItem('port', this.port);
    callback();
  }

  public redirect() {
    this.$router.replace(this.$route.params.wantedRoute || { name: 'home' });
  }

  public changeIcon(selectedIcon: number) {
    this.iconId = selectedIcon;
  }
}
</script>

<style lang="scss">
input[type=text], input[type=password] {
  background: transparent;
  border: 0 solid #7e633b;
  border-bottom-width: 1px;
  width: 100%;
  font-family: Beaufort,serif;
  font-size: 30px;
  font-weight: 400;
  color: #c4b998;
}

.c-input {
  margin: 20px auto;
}

.c-login::before {
  content: "";
    display: block;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    opacity: 1;
    bottom: calc(100% + 25px);
    width: 18px;
    height: 50vh;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
  background-image: url(https://lolstatic-a.akamaihd.net/frontpage/apps/prod/signup/en_GB/0e436452d44f9a739dfe56d0dffe6c3ca02e63b8/assets/en_GB/assets/hangtag.svg);
}

header {
  text-align: center;
  font-family: 'Beaufort';

  h1 {
    font-size: 2rem;
    line-height: 1.16;
    color: #ffffff;
  }

  h4 {
    color: #d5b26e;
    font-size: 1rem;
    line-height: 1.16;
    font-weight: 500;
    letter-spacing: 2px;
    line-height: 1.16;
  }
}

.c-divider {
  max-width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
}
.c-version{
  position:absolute;
  bottom:10px;
  right:15px;
  color:white;
  opacity:0.5;
}
.c-login {
  margin-right: auto;
  margin-left: auto;
  z-index:9;
  position:relative;

  .c-login-form{
    display:flex;
    align-items: center;
    justify-content: space-around;
    form{
      width: 400px;
    }
    .c-news{
      width: 400px;
      height: 400px;
      border: 1px solid rgba(213, 178, 110, 0.5);
      background-color: rgba(0, 0, 0, 0.8);
      overflow:hidden;
      h2{
        padding: 15px;
        margin: 0;
      }
      .c-news_wrapper{
        border-top:1px solid rgba(213, 178, 110, 0.75);
        overflow-y: auto;
        overflow-x: hidden;
        height: 351px;
        .c-news-item{
          width: 100%;
          height: auto;
          border-bottom: 1px solid #32281f;
          padding: 10px;
          transition: all .3s;
          cursor: pointer;
          min-height: 100px;
          margin-bottom: 5px;
          position: relative;
          overflow: hidden;
          h3{
            border-bottom: 1px solid rgba(255,255,255,0.2);
            padding: 0 0 15px 0;
            font-size: 16px;
            color: #d3c7aa;
          }
          p{
            color: #7d6033;
            transition: color 1s cubic-bezier(.06,.81,0,.98);
          }
          &:hover{
            border-color:rgba(213, 178, 110, 0.75);
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  }
}

.c-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-background__video {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: -100;
  background-color: rgba(11, 11, 11, 0.9);
  filter: blur(5px) brightness(0.4);
}
</style>