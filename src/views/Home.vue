<template>
  <div class="c-home" v-if="this.$store.state.logged">
    <ApolloQuery :query="getLobbies">
      <template slot-scope="{ result: { data, loading } }">
        <table>
          <thead>
            <tr>
              <th>
                Lobby name
              </th>
              <th>
                Lobby owner
              </th>
              <th>
                Gamemode
              </th>
              <th>
                Users
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="data" class="channels">
              <tr
                v-for="lobby of data.lobbies"
                :key="lobby.id"
              >
                <td class="name">{{ lobby.name }}</td>
                <td class="owner">{{ lobby.owner.name }}</td>
                <td class="gamemode">{{ lobby.gamemode.name }}</td>
                <td class="users">{{ lobby.playerCount }}/{{ lobby.maxPlayer }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </template>
    </ApolloQuery>
    <div class="c-popup">
      <div class="c-popup__image">
        <img src="http://ddragon.leagueoflegends.com/cdn/4.20.1/img/champion/Blitzcrank.png" />
      </div>
      <div class="c-popup__text">
        <div class="c-popup__text__header">Congratulations!</div>
        You used the League Sandbox client!
    </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GET_LOBBIES } from '../graphql/queries';

@Component({
  components: {
  },
})
export default class Home extends Vue {
  public mounted() {
    if (!this.$store.state.logged) {
      this.$router.replace(this.$route.params.wantedRoute || { name: 'login' });
    }
  }

  public data() {
    return {
      getLobbies: GET_LOBBIES,
    };
  }
}
</script>

<style lang="scss">
.c-popup {
  position: fixed;
  bottom: 0;
  width: 600px;
  left: 50%;
  margin-left: -300px;
  height: 150px;

  .c-popup__image {
    display: inline-block;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      vertical-align:middle;
      margin: 10px;
    }
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #010A12;
    border: 2px solid #463714;  
    vertical-align:top;
  }

  .c-popup__image:after{
      content: "";
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAADGCAMAAAC+RQ9vAAAAHlBMVEVHcEzNv4/Ovo/Nv4/Nv47Nv4/Nv4/Nv47Nv4/Ovo/5YP2YAAAACnRSTlMA/RLbXqU/gcEoouvzmAAABSNJREFUeNrtnet26ygMhbWFbrz/C8+ads6yOeBJ3QQCLd+vkAtmgyRkxwbqAmc6AM4fMK0DcFEQKK1DQm7LcDhNjakchYC1ZSjkKIgazYYgitZeybCzWKHZ4EvbAS6tjWf0B2t7MtBuuSHN4g/cHoGM1JTBSBdDJpppLBfGbYi2hQHN71DM4idy7lw+G0z5ujK26vv5rX6S6g6texqo7agObUrvw6FVoYq4QPNtPUliINNg+PTyKvJ4SFN22EVki+IA/eEIomaX0q0uzeV0InQQwf1lpDI8pXKK/jIGvZhBBImHhCdu9yN/1zgVXvVTdwJeplLPUDu4I2gEBuSiCS+NdxkwGoIWYVaflmFq75hBGLBe0dEA7hd7JUorSP3yAi9EyYtr17IoA7I04kPUa8iA9A7tdbCNlwctKSNSaB8ZGnTgHTpLizp5QMJmPUIvB3T0yb3T68mAU2+6OcaNQe5kxM8jTJXLjUFQ9hnLs8lsmRQOQiFVJP4unEodLDQMqxvypI4OjGvGUcHaKo4q1lZxVLK2iqOaRVSM1zH+4Jyc3oZ/X4U4FTBNQ05yI7cMpikR3EgYLSEZTYgCeu/kAk6zkQMQuoXPZ1gGpHz/R5MZlgPKdBs+hrAXQ8ycHTCaBHnCNkRpGpzpt8H8I1oaSWgJJMX/h4Mwmh6LB7OaJECZpoYVSPI4ysJpYhzAF8JWPsTOxWEu+YsJ7qyZOsetFEmS0pToPTth3hPbZvNBFqblkLD6ZN0zrQR7ArQSBiCEVsEUQBJuzt5IS5ydsCQAag8+nRx/2N+mgNLkKEIee47R5ORMm83m12HCtCwsduRTyY0XlGDnvEoC/xJutBDm/zVb6veUaQlYr3qeRRNAiwAkvXTpbLQIthOSzWazeQ+sLpaZloSzuEYCU8YHKdTFaCFcA3/IxJ96PghaiACA9GFL55xXXJ0WQsT2nx2bzWaz+d3gxMItx4k9AJvNZrPZLAmbCC2EqxcXFbKJa1rwAs9xgY0p4w+hTgthpwtsmfhTz7qXP01c9wWrzWazGcz6N1usf+vLT7oRaf3bwn7UTXrr3zK52Wxezn7I41nMmR4gscJDQVB79CgdfMmH5epP5yd7AqB52Yflrp+3PPIqppXIisqPLWTFfGrfqb7ZSy802rX+Ah3rL5cSRtesv3jN+ksJrb+w0/rLbP30Rc+IeU9s08JO06BC38QShCbBimlg3bVkBYj8vejsNBGWAKOb5ITDopZdS1aAlKkfY8x88Eo8ndbijsKgZjMs/vpUn+dZDp6pwGXlxflX3/Lh8+B744pTNXszlL01zV+N+O0bHlU/NxqG8Mt0CBKXZR2XPgWVOuRFXUIGyEA78qIsnWo+WGtbvkAMzspzj2pHn4Eoovcg84g92BO0h8uN3mA1A9LBMYZvdytAfrVj8PjNh0mRXly9vWMraArpdyrJgHWcLpjesE266dOSsnpZ+fhN60nhT8sAePym9QGvmvAcASmTws7Uwdah350T+Vzlg2S2d2hPsJN92R3T1LqWo596wxFXcR7ItxyiHNODCKb+8IVV20mShVMDCW+OAAOd9mC/H2Mc2jxPBOq3jxBXF8aj0PbIOLwlwxAnSUHFSL4NBnLbMBTSksHla66ytOHUHXouBKwlgwAuv1NXNZ6sQk07ogRuykjI7R+wGk1AFXmoKUOryDYPdctzOZ1cDFmHZLaLn9QypAptk2Gln2glo9YnajQvte2U1rYOCqlkHIVl4MwXLc9MPfgHhC4YftVqJ4sAAAAASUVORK5CYII=);
      width: 150px;
      height: 150px;
      background-size: cover;
      display: block;
      position: relative;
      bottom: 137px;
      right: 16px;
      animation-duration: 30s;
      animation-iteration-count: infinite;
      animation-name: spinner-popup;
      animation-timing-function: ease;
  }

  @keyframes spinner-popup {
    from {
      transform: rotate(0deg)
    }

    50% {
      transform: rotate(1turn)
    }

    from {
      transform: rotate(0deg)
    }
  }

  .c-popup__text {
    display: inline-block;
    background-color: #010A12;
    border: 2px solid #463714;
    width: 480px;
    position: absolute;
    height: 90px;
    top: 15px;
    overflow: hidden;
    z-index: -1;
    left: 63px;
    padding-left: 80px;

    .c-popup__text__header {
      font-weight: bold;
      margin-top: 5px;
    }
  }
}
</style>
