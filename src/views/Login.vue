<template>
  <div class="c-login">
    <div class="c-background__video">
      <video autoplay loop="true" :src="splashVideo" style="width: auto; height: auto; min-height: 88vh; min-width: 100vw; position: absolute; top: 11.3889%; left: 70.3906%; transform: translate(-70.3906%, -11.3889%); z-index: -1;"></video>
    </div>
    <header>
      <h1>
        JOIN LEAGUE SANBOX NOW
      </h1>
      <h4>
        Please gank top
      </h4>
      
      <div class="c-divider">
        <img src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/signup/en_GB/0e436452d44f9a739dfe56d0dffe6c3ca02e63b8/assets/en_GB/assets/divider.png" alt="divide">
      </div>
    </header>
    <ApolloMutation
      :mutation="connectMutation"
      :variables="{
        username,
        iconId,
      }"
      @done="onDone">
      <form slot-scope="{ mutate, loading, error }"
        @submit.prevent="connect(mutate)">
        <div class="c-loader" v-if="loading">
          <div class="c-spinner">
          </div>
        </div>
        <div class="c-input">
          <label>
            Path to LoL
          </label>
          <input type="text" 
          v-model="path" />
        </div>
        <div class="c-input">
          <label>
            Username
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
          <IconSelector :onChange="changeIcon" />
          <Button text="Login" />
        </div>
      </form>
    </ApolloMutation>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import IconSelector from '@/components/IconSelector.vue';
import { RANDOM_SPLASHSCREEN } from '../assets/staticData';
import { GET_USERS } from '../graphql/queries';
import { CONNECT } from '../graphql/mutations';

import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';

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
      query: GET_USERS,
      connectMutation: CONNECT,
      username: localStorage.getItem('username'),
      iconId: 0,
      host: localStorage.getItem('host'),
      port: localStorage.getItem('port'),
      path: localStorage.getItem('path'),
      splashVideo: RANDOM_SPLASHSCREEN,
    };
  }

  public async onDone(result: any) {
    localStorage.setItem('token-lobby', result.data.connect);
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
    const httpLink = new HttpLink({
      uri,
    });

    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token-lobby');
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? token : '',
        },
      };
    });
    (this.$apollo.provider as any).defaultClient.link = authLink.concat(httpLink);
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

.c-login {
  width: 70%;
  margin-right: auto;
  margin-left: auto;
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