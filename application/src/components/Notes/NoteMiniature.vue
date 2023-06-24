<template>
    <a href="#" @click.prevent="goToNote(note.id)"
        class="note inline-block aspect-square overflow-hidden w-[170px] h-[170px] sm:w-[200px] sm:h-[200px] bg-yellow-200 relative p-2 select-none cursor-pointer transition-all duration-100"
        :class="'rounded-bl-[' + borderRadiusBottomLeft + 'px] rounded-br-[' + borderRadiusBottomRight + 'px]'">
        <header class="flex justify-between items-start gap-4 pb-1">
            <h2 :class="note.text ? 'truncate' : ''" class="white-space-nowrap">{{ note.title }}</h2>
            <span v-if="note.importance === 3"
                class="px-2 bg-red-500 text-sm text-white font-extrabold rounded-full whitespace-nowrap">!</span>
            <span v-else-if="note.importance === 2"
                class="mr-1 text-xl text-red-600 font-extrabold whitespace-nowrap">!</span>
        </header>
        <p class="mt-2 line-clamp-3 whitespace-pre-wrap">{{ markdownToText(note.text) }}</p>
        <span v-if="note.tags[0]" class="absolute bottom-1 right-1 text-xs opacity-80">{{ note.tags[0].label }}</span>
        <span v-if="deadlineDate" :class="colorDate" class="absolute bottom-1 left-1 text-xs opacity-80">Pour le {{
            deadlineDate }} à <strong>{{ deadlineHours }}</strong></span>
        <span class="absolute top-0 left-0 text-xs opacity-30">{{ note.id }}</span>
    </a>
</template>
  
<script>
import { markdownToText } from '../../utils/markdown.js'

export default {
    name: 'NoteMiniature',

    props: {
        note: Object
    },

    data() {
        return {
            borderRadiusBottomLeft: Math.floor(Math.random() * 10) + 1,
            borderRadiusBottomRight: Math.floor(Math.random() * 10) + 1
        };
    },

    computed: {
        deadlineHours() {
            const date = new Date(this.note.deadlineAt).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(/(^|\D)0(?!\d)/g, '$1');
            return new Date(this.note.deadlineAt) > new Date('1970-01-01') ? date : '';
        },
        deadlineDate() {
            const date = new Date(this.note.deadlineAt).toLocaleString('fr-FR', { day: '2-digit', month: 'short' });
            return new Date(this.note.deadlineAt) > new Date('1970-01-01') ? date : '';
        },
        colorDate() {
            const date = new Date(this.note.deadlineAt);
            const now = new Date();
            return date < now && date > new Date('1970-01-01') ? 'text-red-500' : '';
        }
    },

    methods: {
        goToNote(id) {
            this.$router.push('/notes/' + id);
        },

        markdownToText (markdown) {
            return markdownToText(markdown)
        }
    }
};
</script>
  
<style lang="scss" scoped>
.note {
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(156, 156, 156, 0.085);

    &:hover {
        box-shadow: 3px 8px 6px rgba(0, 0, 0, 0.2);
        transform-origin: top center;
        transform: perspective(1000px) rotateX(5deg);
    }

    header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.085);
    }

    h2,
    p {
        font-family: 'Architects Daughter', cursive;
    }

    h2 {
        font-size: 1.2rem;
        font-weight: bold;
    }
}
</style>
  