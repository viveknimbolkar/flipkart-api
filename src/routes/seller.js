const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../database/database");
const { verifyUser } = require("../middleware/verifyUser");
const { Laptop } = require("../model/product/laptop");
const { Seller } = require("../model/seller");
router.post("/seller/add_product", verifyUser, async (req, res) => {
  const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  const {
    productType,
    details,
    rating,
    price,
    originalPrice,
    percentOff,
    discount,
    images,
    exchange,
    withPrice,
    withoutPrice,
    sellerName,
    sellerRating,
    importantNote,
    offers,
    highlights,
    fiveStar,
    fourStar,
    threeStar,
    twoStar,
    oneStar,
    totalRating,
    reviews, // array
    performance,
    battery,
    design,
    display,
    author,
    reviewRating,
    longComment,
    shortComment,
    reviewDate,
    reviewImages,
    salesPackage,
    modelNumber,
    partNumber,
    series,
    color,
    type,
    suitableFor,
    batteryCell,
    msOfficeProvided,
    dedicatedGraphicMemoryType,
    dedicatedGraphicMemoryCapacity,
    processorBrand,
    processorName,
    SSD,
    SSDCapacity,
    RAM,
    RAMType,
    processorVariant,
    clockSpeed,
    expandableMemory,
    RAMFrequency,
    cache,
    graphicProcessor,
    numberOfCores,
    OSArchitecture,
    operatingSystem,
    systemArchitecture,
    micIn,
    RJ45,
    USBPort,
    multiCardSlot,
    HDMIPort,
    hardwareInterface,
    touchscreen,
    screenSize,
    screenResolution,
    screenType,
    speakers,
    internalMic,
    soundProperties,
    refreshRate,
    wirelessLAN,
    bluetooth,
    ethernet,
    dimensions,
    weight,
    diskDrive,
    webCamera,
    fingerPrintSensor,
    keyboard,
    backlitKeyboard,
    pointerDevice,
    includedSoftware,
    additionalFeatures,
    warrantySummary,
    warrantyServiceType,
    coveredInnWarranty,
    notCoveredInWarranty,
    domesticWarranty,
  } = req.body;

  const productData = {
    productType: productType,
    details: details,
    rating: rating,
    price: price,
    originalPrice: originalPrice,
    percentOff: percentOff,
    discount: discount,
    images: images,
    exchange: {
      withPrice: withPrice,
      withoutPrice: withoutPrice,
    },
    sellerInfo: {
      sellerName: sellerName,
      sellerRating: sellerRating,
    },
    importantNote: importantNote,
    offers: offers,
    easyPaymentOptions: {
      starRatings: {
        fiveStar: fiveStar,
        fourStar: fourStar,
        threeStar: threeStar,
        twoStar: twoStar,
        oneStar: oneStar,
      },
      totalRating: totalRating,
      reviews: reviews,
      average: {
        performance: performance,
        battery: battery,
        design: design,
        display: display,
      },
    },
    reviewDetails: reviews,
    specifications: {
      general: {
        salesPackage: salesPackage,
        modelNumber: modelNumber,
        partNumber: partNumber,
        series: series,
        color: color,
        type: type,
        suitableFor: suitableFor,
        batteryCell: batteryCell,
        msOfficeProvided: msOfficeProvided,
      },
      processorAndMemoryFeatures: {
        dedicatedGraphicMemoryType: dedicatedGraphicMemoryType,
        dedicatedGraphicMemoryCapacity: dedicatedGraphicMemoryCapacity,
        processorBrand: processorBrand,
        processorName: processorName,
        SSD: SSD,
        SSDCapacity: SSDCapacity,
        RAM: RAM,
        RAMType: RAMType,
        processorVariant: processorVariant,
        clockSpeed: clockSpeed,
        expandableMemory: expandableMemory,
        RAMFrequency: RAMFrequency,
        cache: cache,
        graphicProcessor: graphicProcessor,
        graphicProcessor: graphicProcessor,
        numberOfCores: numberOfCores,
      },
      operatingSystem: {
        OSArchitecture: OSArchitecture,
        operatingSystem: operatingSystem,
        systemArchitecture: systemArchitecture,
      },
      portAndSlotFeatures: {
        micIn: micIn,
        RJ45: RJ45,
        USBPort: USBPort,
        multiCardSlot: multiCardSlot,
        HDMIPort: HDMIPort,
        hardwareInterface: hardwareInterface,
      },
      displayAndAudioFeatures: {
        touchscreen: touchscreen,
        screenSize: screenSize,
        screenResolution: screenResolution,
        screenType: screenType,
        speakers: speakers,
        internalMic: internalMic,
        soundProperties: soundProperties,
        refreshRate: refreshRate,
      },
      connectivityFeatures: {
        wirelessLAN: wirelessLAN,
        bluetooth: bluetooth,
        ethernet: ethernet,
      },
      dimensions: {
        dimensions: dimensions,
        weight: weight,
      },
      additionalFeatures: {
        diskDrive: diskDrive,
        webCamera: webCamera,
        fingerPrintSensor: fingerPrintSensor,
        keyboard: keyboard,
        backlitKeyboard: backlitKeyboard,
        pointerDevice: pointerDevice,
        includedSoftware: includedSoftware,
        additionalFeatures: additionalFeatures,
      },
      warranty: {
        warrantySummary: warrantySummary,
        warrantyServiceType: warrantyServiceType,
        coveredInnWarranty: coveredInnWarranty,
        notCoveredInWarranty: notCoveredInWarranty,
        domesticWarranty: domesticWarranty,
      },
    },
  };

  const productInstance = new Laptop(productData);
  const result = await productInstance.save();
  if (result) {
    // add product in respective seller account
    const filter = { email: token.email };
    const updateProductList = {
      $push: {
        product: result._id,
      },
    };
    const addProductInSeller = await Seller.updateOne(
      filter,
      updateProductList
    );
    if (addProductInSeller) {
      res.status(200).json({ message: "product added successfully" });
    } else {
      res
        .status(400)
        .json({ message: "something went wrong! try again later" });
    }
  } else {
    res.status(200).json({ message: "something went wrong! try again later" });
  }
});

router.get("/get_reviews", verifyUser, async (req, res) => {
  const email = jwt.decode(
    req.headers.authorization,
    process.env.JWT_SECRET
  ).email;

  Customer.findOne({ email: email })
    .exec()
    .then((data) => {
      if (data) {
        const reviewItemsId = data.reviews;
        Reviews.find(
          {
            _id: {
              $in: reviewItemsId,
            },
          },
          (err, result) => {
            if (err) {
              res
                .status(400)
                .json({ msg: "something went wrong. please try again later" });
            }
            res.status(200).json({ msg: result });
          }
        );
      } else {
        res.status(404).json({ msg: "no reviews found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ msg: "something went wrong. please try again" });
    });
});

router.post("/remove_review", verifyUser, async (req, res) => {
  const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  const {
    id, // product id
    name, // product name
  } = req.body;

  if (!name || !id) {
    res.status(400).json({ message: "empty fields are not allowed" });
  }

  Reviews.findByIdAndDelete(id, async (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted from cart collection");
      // remove from user collection as well
      const filter = { email: token.email };
      const updateCart = {
        $pull: {
          cart: {
            $in: [id],
          },
        },
      };
      const removeCartID = await Customer.updateOne(filter, updateCart);
      if (removeCartID) {
        res.status(200).json({
          message: "cart item removed successfuly",
        });
      } else {
        res
          .status(200)
          .json({ message: "something went wrong! try again later" });
      }
    }
  });
});

module.exports = router;
