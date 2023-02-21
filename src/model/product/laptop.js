const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const specification = new Schema({
  general: new Schema({
    salesPackage: [String],
    modelNumber: {
      require: true,
      type: String,
    },
    partNumber: {
      require: true,
      type: String,
    },
    series: {
      require: true,
      type: String,
    },
    color: {
      require: true,
      type: String,
    },
    type: {
      require: true,
      type: String,
    },
    suitableFor: {
      require: true,
      type: String,
    },
    batteryCell: {
      require: true,
      type: String,
    },
    msOfficeProvided: {
      require: true,
      type: String,
    },
  }),
  processorAndMemoryFeatures: new Schema({
    dedicatedGraphicMemoryType: {
      require: true,
      type: String,
    },
    dedicatedGraphicMemoryCapacity: {
      require: true,
      type: String,
    },
    processorBrand: {
      require: true,
      type: String,
    },
    ProcessorName: {
      require: true,
      type: String,
    },
    SSD: {
      require: true,
      type: String,
    },
    SSDCapacity: {
      require: true,
      type: String,
    },
    RAM: {
      require: true,
      type: String,
    },
    RAMType: {
      require: true,
      type: String,
    },
    processorVariant: {
      require: true,
      type: String,
    },
    clockSpeed: {
      require: true,
      type: String,
    },
    expandableMemory: {
      require: true,
      type: String,
    },
    RAMFrequency: {
      require: true,
      type: String,
    },
    cache: {
      require: true,
      type: String,
    },
    graphicProcessor: {
      require: true,
      type: String,
    },
    numberOfCores: {
      require: true,
      type: String,
    },
  }),
  operatingSystem: new Schema({
    OSArchitecture: {
      require: true,
      type: String,
    },
    operatingSystem: {
      require: true,
      type: String,
    },
    systemArchitecture: {
      require: true,
      type: String,
    },
  }),
  portAndSlotFeatures: new Schema({
    micIn: {
      require: true,
      type: String,
    },
    RJ45: {
      require: true,
      type: String,
    },
    USBPort: [String],
    multiCardSlot: {
      require: true,
      type: String,
    },
    HDMIPort: {
      require: true,
      type: String,
    },
    hardwareInterface: {
      require: true,
      type: String,
    },
  }),
  displayAndAudioFeatures: new Schema({
    touchscreen: {
      require: true,
      type: String,
    },
    screenSize: {
      require: true,
      type: String,
    },
    screenResolution: {
      require: true,
      type: String,
    },
    screenType: [String],
    speakers: {
      require: true,
      type: String,
    },
    internalMic: {
      require: true,
      type: String,
    },
    soundProperties: {
      require: true,
      type: String,
    },
    refreshRate: {
      require: true,
      type: String,
    },
  }),
  connectivityFeatures: new Schema({
    wirelessLAN: {
      require: true,
      type: String,
    },
    bluetooth: {
      require: true,
      type: String,
    },
    ethernet: {
      require: true,
      type: String,
    },
  }),
  dimensions: new Schema({
    dimensions: {
      require: true,
      type: String,
    },
    weight: {
      require: true,
      type: String,
    },
  }),
  additionalFeatures: new Schema({
    diskDrive: {
      require: true,
      type: String,
    },
    webCamera: {
      require: true,
      type: String,
    },
    fingerPrintSensor: {
      require: true,
      type: String,
    },
    keyboard: [String],
    backlitKeyboard: {
      require: true,
      type: String,
    },
    pointerDevice: {
      require: true,
      type: String,
    },
    includedSoftware: [String],
    additionalFeatures: {
      require: true,
      type: String,
    },
  }),
  warranty: new Schema({
    warrantySummary: {
      require: true,
      type: String,
    },
    warrantyServiceType: {
      require: true,
      type: String,
    },
    coveredInnWarranty: {
      require: true,
      type: String,
    },
    notCoveredInWarranty: {
      require: true,
      type: String,
    },
    domesticWarranty: {
      require: true,
      type: String,
    },
  }),
});

const review = new Schema({
  author: {
    require: true,
    type: String,
  },
  rating: {
    require: true,
    type: String,
  },
  longComment: {
    require: true,
    type: String,
  },
  shortComment: {
    require: true,
    type: String,
  },
  date: {
    require: true,
    type: String,
  },
  images: [String],
});

const exchange = new Schema({
  withPrice: {
    require: true,
    type: String,
  },
  withoutPrice: {
    require: true,
    type: String,
  },
});

const seller_info = new Schema({
  name: {
    require: true,
    type: String,
  },
  rating: {
    require: true,
    type: String,
  },
});

const easy_payment_options = new Schema({
  starRatings: new Schema({
    fiveStar: {
      require: true,
      type: String,
    },
    fourStar: {
      require: true,
      type: String,
    },
    threeStar: {
      require: true,
      type: String,
    },
    twoStar: {
      require: true,
      type: String,
    },
    oneStar: {
      require: true,
      type: String,
    },
  }),
  totalRating: {
    require: true,
    type: String,
  },
  reviews: {
    require: true,
    type: String,
  },
  average: new Schema({
    performance: {
      require: true,
      type: String,
    },
    battery: {
      require: true,
      type: String,
    },
    design: {
      require: true,
      type: String,
    },
    display: {
      require: true,
      type: String,
    },
  }),
});

// main user schema
const laptop = new Schema({
  details: {
    require: true,
    type: String,
  },
  rating: {
    require: true,
    type: String,
  },
  price: {
    require: true,
    type: String,
  },
  originalPrice: {
    require: true,
    type: String,
  },
  percentOff: {
    require: true,
    type: String,
  },
  discount: {
    require: true,
    type: String,
  },
  rating: {
    require: true,
    type: String,
  },
  images: [String],
  exchange: exchange,
  sellerInfo: seller_info,
  importantNote: {
    require: true,
    type: String,
  },
  offers: [Object],
  highlights: [String],
  easyPaymentOptions: {
    require: true,
    type: String,
  },
  easyPaymentOptions: easy_payment_options,
  reviewDetails: [review],
  specifications: specification,
});

const Laptop = mongoose.model("Laptop", laptop);

module.exports = { Laptop };
