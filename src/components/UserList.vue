<template>
  <div class="c-userlist">
    <ApolloQuery :query="getUsers">
      <template slot-scope="{ result: { data, loading } }">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="data">
          <div
          v-for="user of data.users"
          :key="user.id"
          class="c-user"
          >
          <div class="c-user__availability">
            <div :class="['c-availability__indicator', user.availability]"></div>
          </div>
            <div class="c-user__info">
              <div class="c-user__icon">
                <img :src="'http://ddragon.leagueoflegends.com/cdn/8.14.1/img/profileicon/' + user.icon + '.png'" class="" />
              </div>
              <div class="c-user__data">
                <div class="c-user__name">
                  {{ user.name }}
                </div>
                <div class="c-user__status">
                  {{ user.availability }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
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

<style lang="scss">
.c-userlist {
  .c-user {
    background-color: #010a13;
    border-bottom: 1px solid #463714;
    padding: 5px;

    .c-user__availability {
      .c-availability__indicator {
        content: '';
        position: absolute;
        margin-top: 38px;
        left: 40px;
        
        width: 12px;
        height: 12px;
      }

      .ONLINE {
        background-color: #069664;
        border-radius: 50%;
        border: solid 2px #00ED96;
      }

      .IN_GAME, .IN_LOBBY {
        background-color: #004F72;
        border-radius: 50%;
        border: solid 2px #00CFEA;
      }

      .AWAY {
        background-color: #310D1E;
        border-radius: 50%;
        border: solid 2px #BF2038;
      }
    }

    .c-user__info {
      display: flex;

      .c-user__icon {
        width: 50px;
        height: 50px;
        border: 1px solid #645127;
        border-color: #c0ab71;
        border-width: 2px;
        border-radius: 50%;

        img {
          border-radius: 50%;
        }
      }

      .c-user__data {
        padding: 5px;
      }
    }
  }
}
</style>
