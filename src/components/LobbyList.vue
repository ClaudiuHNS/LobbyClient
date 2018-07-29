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