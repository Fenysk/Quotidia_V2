<template>
    <a href="#"
    @click.prevent="goToNote(note.id)"
    class="note
    inline-block
    aspect-square overflow-hidden
    w-[170px] h-[170px] sm:w-[200px] sm:h-[200px]
    bg-yellow-200
    relative
    p-2
    select-none cursor-pointer
    transition-all duration-100
    " :class="'rounded-bl-[' + borderRadiusBottomLeft + 'px] rounded-br-[' + borderRadiusBottomRight + 'px]'">
        <header class="flex justify-between items-start gap-4 pb-1">
            <h2 class="white-space-nowrap" :class="note.text ? 'truncate' : ''">{{ note.title }}</h2>
            <span v-if="note.importance === 3"
                class="px-2 bg-red-500 text-sm text-white font-extrabold rounded-full whitespace-nowrap">!</span>
            <span v-else-if="note.importance === 2"
                class="mr-1 text-xl text-red-600 font-extrabold whitespace-nowrap">!</span>
        </header>
        <p class="mt-2 line-clamp-3">{{ note.text }}</p>
        <span class="absolute bottom-1 right-1 text-xs opacity-80" v-if="note.tags[0]">{{ note.tags[0].label }}</span>
        <span v-if="deadlineDate" :class="colorDate" class="absolute bottom-1 left-1 text-xs opacity-80">Pour le {{
            deadlineDate }} à <strong>{{ deadlineHours }}</strong></span>
    </a>
</template>

<script>

export default {
    name: 'NoteMiniature',

    props: {
        note: Object
    },

    data() {
        return {
            borderRadiusBottomLeft: Math.floor(Math.random() * 10) + 1,
            borderRadiusBottomRight: Math.floor(Math.random() * 10) + 1,
        }
    },

    computed: {
        deadlineHours() {
            // like 9h with letter 'h' in the middle and without minutes if it's 0
            const date = new Date(this.note.deadlineAt).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace('01:', '1h').replace('02:', '2h').replace('03:', '3h').replace('04:', '4h').replace('05:', '5h').replace('06:', '6h').replace('07:', '7h').replace('08:', '8h').replace('09:', '9h').replace('h00', 'h')
            // if > 1 janvier 1970 return date else return nothing
            return new Date(this.note.deadlineAt) > new Date('1970-01-01') ? date : ''
        },
        deadlineDate() {
            // like 01 janv.
            const date = new Date(this.note.deadlineAt).toLocaleString('fr-FR', { day: '2-digit', month: 'short' })
            // if > 1 janvier 1970 return date else return nothing
            return new Date(this.note.deadlineAt) > new Date('1970-01-01') ? date : ''
        },
        colorDate() {
            // si deadline passé, rouge
            const date = new Date(this.note.deadlineAt)
            const now = new Date()
            if (date < now && date > new Date('1970-01-01')) {
                return 'text-red-500'
            } else {
                return ''
            }
        }
    },

    methods: {
        goToNote(id) {
            this.$router.push({ name: 'NoteView', params: { id: id } })
        }
    }

}
</script>

<style lang="scss" scoped>
.note {
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(156, 156, 156, 0.085);

    &:hover {
        box-shadow: 2px 6px 6px rgba(0, 0, 0, 0.2);
        transform-origin: top center;
        transform: perspective(1000px) rotateX(5deg);
    }

    header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.085)
    }

    h2,
    p {
        font-family: 'Architects Daughter', cursive;
    }

    h2 {
        font-weight: bold;
    }

}</style>