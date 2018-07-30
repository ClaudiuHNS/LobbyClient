<template>
  <ApolloQuery :query="getUsers">
    <template slot-scope="{ result: { data, loading } }">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="data">
        <div
          v-for="user of data.users"
          :key="user.id"
        >
        <img :src="'http://ddragon.leagueoflegends.com/cdn/8.14.1/img/profileicon/' + user.icon + '.png'" />
          {{ user.name }}
          {{ user.availability}}
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GET_USERS } from '../graphql/queries';
import Button from '@/components/Button.vue';
import PlayMenu from '@/components/PlayMenu.vue';

@Component({
  components: {
    Button,
    PlayMenu,
  },
})
export default class UserList extends Vue {
  public data() {
    return {
      getUsers: GET_USERS,
    };
  }
}
</script>

<style>

</style>
