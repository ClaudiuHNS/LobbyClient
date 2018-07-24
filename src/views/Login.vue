<template>
  <div class="c-login">
    <header>
      <h1>
        JOIN LEAGUE SANDBOX NOW BECAUSE LEAGUE OF MEMORIES SUCKS
      </h1>
      <h4>
        Be sure to use the same credentials than the League of Legends server
      </h4>
      
      <div class="c-divider">
        <img src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/signup/en_GB/0e436452d44f9a739dfe56d0dffe6c3ca02e63b8/assets/en_GB/assets/divider.png" alt="divide">
      </div>
    </header>
    <form>
      <div class="c-input">
        <label>
          Username
        </label>
        <input type="text" />
      </div>
      <div class="c-input">
        <label>
          Password
        </label>
        <input type="password" />
      </div>
      <div class="c-button">
        <Button text="Login" />
      </div>
      Or just use git so we can see if you are a good LoM contributor <svg style="fill: #ffffff;" height="32" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
    </form>
    <div>
      <ApolloQuery :query="query">
      <!-- The result will automatically updated -->
      <template slot-scope="{ result: { data, loading } }">
        <!-- Some content -->
        <div v-if="loading">Loading...</div>
        <ul v-if="data">
          <li v-for="user of data.users" :key="user.id" class="user">
            {{ user.name }}
          </li>
        </ul>
      </template>
    </ApolloQuery>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue'; // @ is an alias to /src
import IconSelector from '@/components/IconSelector.vue';
import { GET_USERS } from '../graphql/queries';

@Component({
  components: {
    Button,
    IconSelector,
  },
})
export default class Login extends Vue {
  public data() {
    return {
      query: GET_USERS,
    };
  }

  methods() {
    return {
      onDone: async function(result: any) {
        console.log(result);
      }
    }
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
</style>