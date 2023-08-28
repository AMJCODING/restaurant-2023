<template>
  <div class="LocatinsTable">
    <table class="table caption-top" v-if="locations.length > 0">
      <caption>
        <span> number of locations is({{ locations.length }})</span>
        <span class="float-end">
          <router-link :to="{ name: 'deleteAllLocations' }">
            <button class="btn btn-danger">Delete all</button>
          </router-link>
        </span>
      </caption>
      <thead class="table-primary">
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loc in locations" :key="loc.id">
          <td class="bold">{{ loc.name }}</td>
          <td>{{ loc.address }}</td>
          <td>{{ loc.phone }}</td>
          <td>
            <router-link
              :to="{ name: 'UpdateLocation', params: { locationID: loc.id } }"
            >
              <button class="btn btn-info">Update</button>
            </router-link>
            &nbsp;
            <router-link :to="{ name: 'menu', params: { locationID: loc.id } }">
              <button class="btn btn-success">Veiw menu</button>
            </router-link>
            &nbsp;
            <router-link
              :to="{ name: 'deleteLocation', params: { locationID: loc.id } }"
            >
              <button class="btn btn-danger">Delete</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="locations.length == 0" class="alert alert-warning">
      Sorry no locations added yet...
    </p>
  </div>
</template>

<script>
export default {
  name: "LocationsTable",
  props: ["locations"],
};
</script>

<style scoped>
td {
  text-align: center;
}
th {
  text-align: center;
}
.bold {
  font-weight: bold;
}
</style>
