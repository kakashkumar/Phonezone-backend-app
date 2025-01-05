const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User', 
//     required: true
//   },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: false
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review' 
  }],
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  sp: {
    type: Number,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  countInStock: {
    type: Number,
    required: true
  },

  network: {
    technology: {
      type: String,
      required: true
    }
  },
  launch: {
    announced: {
      type: Date,
      required: false
    },
    status: {
      type: String,
      required: true
    }
  },
  colors:{
    type:[String],
    required:false
  },
  size:{
    type:{},
    required:true
  },
  body: {
    dimensions: {
      type: String,
      required: true
    },
    weight: {
      type: String,
      required: true
    },
    build: {
      type: String,
      required: true
    },
    sim: {
      type: String,
      required: true
    }
    
  },
  display: {
    type: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    resolution: {
      type: String,
      required: true
    },
    protection: {
      type: String,
      required: true
    }
  },
  platform: {
    os: {
      type: String,
      required: true
    },
    chipset: {
      type: String,
      required: true
    },
    cpu: {
      type: String,
      required: true
    },
    gpu: {
      type: String,
      required: true
    }
  },
  memory: {
    cardSlot: {
      type: String,
      required: true
    },
    internal: {
      type: String,
      required: true
    }
  },
  mainCamera: {
   dual:{
    type:String,
    required:true
   },
   features:{
    type:String,
    required:true
   },
   video:{
    type:String,
    required:true
   },
  },
  selfieCamera: {
    single:{
      type:String,
      required:true
    },
    features:{
      type:String,
      required:true
    },
    video:{
      type:String,
      required:true
    },
  },
  sound: {
    loudspeaker: {
      type: String,
      required: true
    },
    jack: {
      type: String,
      required: true
    }
  },
  comms: {
    wlan: {
      type: String,
      required: true
    },
    bluetooth: {
      type: String,
      required: true
    },
    positioning: {
      type: String,
      required: true
    },
    nfc: {
      type: Boolean,
      required: true
    },
    radio: {
      type: String,
      required: true
    },
    usb: {
      type: String,
      required: true
    }
  },
  features: {
    sensors: {
      type:String,
      required:true
    },
    
  },
  battery: {
    type: {
      type: String,
      required: true
    },
    
    charging: {
      type: String,
      required: true 
  }
}
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema)

module.exports = Product