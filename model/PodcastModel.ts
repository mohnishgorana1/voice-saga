import mongoose from 'mongoose';
const { Schema } = mongoose;

const PodcastSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },


    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },

    voice_type: {
        type: String,
        required: true,
        enum: ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'],
    },
    voice_prompt: {
        type: String,
        required: true,
    },

    audio: {
        duration: {
            type: Number,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        }
    },



    image_prompt: {
        type: String,
        required: true,
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        }
    },


    views: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });

const PodcastModel = (mongoose.models.Podcast) || mongoose.model('Podcast', PodcastSchema);

export default PodcastModel;
