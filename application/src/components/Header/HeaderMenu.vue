<template>
    <div class="
      modalMenu
      fixed top-16 left-0 z-50
      h-[calc(100vh-4rem)] w-full
      bg-white
  ">
        <nav class="h-full w-full">
            <ul class="flex flex-col items-center justify-center h-full gap-8">
                <li>
                    <router-link @click="openModal('Menu')" class="text-2xl" to="/dashboard">Dashboard</router-link>
                </li>

                <li>
                    <router-link @click="openModal('Menu')" class="text-2xl" to="/test">Test</router-link>
                </li>

                <button @click="disconnect">Se déconnecter</button>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: "App",

    props: {
        modalMenuShow: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        openModal(modal) {
            this.$emit('openModal', modal)
        },

        disconnect() {
            console.log('Try to disconnect...')
            localStorage.removeItem('token')
            
            this.$emit('openModal', 'Menu')
            this.$router.push('/login')            
        }
    },
};

</script>