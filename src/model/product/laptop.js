const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const specification = new Schema({
  general: new Schema({
    salesPackage: [String],
    modelNumber: {
      type: String,
    },
    partNumber: {
      type: String,
    },
    series: {
      type: String,
    },
    color: {
      type: String,
    },
    type: {
      type: String,
    },
    suitableFor: {
      type: String,
    },
    batteryCell: {
      type: String,
    },
    msOfficeProvided: {
      type: String,
    },
  }),
  processorAndMemoryFeatures: new Schema({
    dedicatedGraphicMemoryType: {
      type: String,
    },
    dedicatedGraphicMemoryCapacity: {
      type: String,
    },
    processorBrand: {
      type: String,
    },
    processorName: {
      type: String,
    },
    SSD: {
      type: String,
    },
    SSDCapacity: {
      type: String,
    },
    RAM: {
      type: String,
    },
    RAMType: {
      type: String,
    },
    processorVariant: {
      type: String,
    },
    clockSpeed: {
      type: String,
    },
    expandableMemory: {
      type: String,
    },
    RAMFrequency: {
      type: String,
    },
    cache: {
      type: String,
    },
    graphicProcessor: {
      type: String,
    },
    numberOfCores: {
      type: String,
    },
  }),
  operatingSystem: new Schema({
    OSArchitecture: {
      type: String,
    },
    operatingSystem: {
      type: String,
    },
    systemArchitecture: {
      type: String,
    },
  }),
  portAndSlotFeatures: new Schema({
    micIn: {
      type: String,
    },
    RJ45: {
      type: String,
    },
    USBPort: [String],
    multiCardSlot: {
      type: String,
    },
    HDMIPort: {
      type: String,
    },
    hardwareInterface: {
      type: String,
    },
  }),
  displayAndAudioFeatures: new Schema({
    touchscreen: {
      type: String,
    },
    screenSize: {
      type: String,
    },
    screenResolution: {
      type: String,
    },
    screenType: [String],
    speakers: {
      type: String,
    },
    internalMic: {
      type: String,
    },
    soundProperties: {
      type: String,
    },
    refreshRate: {
      type: String,
    },
  }),
  connectivityFeatures: new Schema({
    wirelessLAN: {
      type: String,
    },
    bluetooth: {
      type: String,
    },
    ethernet: {
      type: String,
    },
  }),
  dimensions: new Schema({
    dimensions: {
      type: String,
    },
    weight: {
      type: String,
    },
  }),
  additionalFeatures: new Schema({
    diskDrive: {
      type: String,
    },
    webCamera: {
      type: String,
    },
    fingerPrintSensor: {
      type: String,
    },
    keyboard: [String],
    backlitKeyboard: {
      type: String,
    },
    pointerDevice: {
      type: String,
    },
    includedSoftware: [String],
    additionalFeatures: {
      type: String,
    },
  }),
  warranty: new Schema({
    warrantySummary: {
      type: String,
    },
    warrantyServiceType: {
      type: String,
    },
    coveredInnWarranty: {
      type: String,
    },
    notCoveredInWarranty: {
      type: String,
    },
    domesticWarranty: {
      type: String,
    },
  }),
});

const review = new Schema({
  author: {
    type: String,
  },
  reviewRating: {
    type: String,
  },
  longComment: {
    type: String,
  },
  shortComment: {
    type: String,
  },
  reviewDate: {
    type: String,
  },
  reviewImages: [String],
});

const exchange = new Schema({
  withPrice: {
    type: String,
  },
  withoutPrice: {
    type: String,
  },
});

const seller_info = new Schema({
  sellerName: {
    type: String,
  },
  sellerRating: {
    type: String,
  },
});

const easy_payment_options = new Schema({
  starRatings: new Schema({
    fiveStar: {
      type: String,
    },
    fourStar: {
      type: String,
    },
    threeStar: {
      type: String,
    },
    twoStar: {
      type: String,
    },
    oneStar: {
      type: String,
    },
  }),
  totalRating: {
    type: String,
  },
  reviews: {
    type: String,
  },
  average: new Schema({
    performance: {
      type: String,
    },
    battery: {
      type: String,
    },
    design: {
      type: String,
    },
    display: {
      type: String,
    },
  }),
});

// main user schema
const laptop = new Schema({
  productType: { type: String, require: true },
  details: {
    type: String,
  },
  rating: {
    type: String,
  },
  price: {
    type: String,
  },
  originalPrice: {
    type: String,
  },
  percentOff: {
    type: String,
  },
  discount: {
    type: String,
  },
  images: [String],
  exchange: exchange,
  sellerInfo: seller_info,
  importantNote: {
    type: String,
  },
  offers: [Object],
  highlights: [String],
  easyPaymentOptions: easy_payment_options,
  reviewDetails: [review],
  specifications: specification,
});

const Laptop = mongoose.model("Laptop", laptop);

module.exports = { Laptop };
