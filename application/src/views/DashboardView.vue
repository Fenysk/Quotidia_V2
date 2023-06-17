<template>
    <div>
        <h1>Dashboard</h1>
        <p v-if="!$store.state.authenticated">
            You are not logged in. Please login to view this page.
        </p>
        <p v-else>
            You are logged in. Welcome to the dashboard!
        </p>
    </div>
</template>

<script>

</script>