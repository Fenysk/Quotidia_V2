<template>
    <div class="right_bar
        bg-gray-100
        h-full
        overflow-hidden
        rounded-t-lg
        transition-all duration-50
    ">

        <Now v-if="
            path.name === 'today' ||
            path.name === 'notes' ||
            path.name === 'note'
        " />

    </div>
</template>
  
<script>
import Now from '../Widgets/Now.vue';

export default {
    name: "RightBar",
    components: { Now },
    
    props: {
        path: String,
    },
};

</script>
  