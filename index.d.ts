declare module "passKitPackageFormatV1" {

	export type TdataDetector = "PKDataDetectorTypePhoneNumber" | "PKDataDetectorTypeLink" | "PKDataDetectorTypeAddress" | "PKDataDetectorTypeCalendarEvent";

	export type TtextAlignment = "PKTextAlignmentLeft" | "PKTextAlignmentCenter" | "PKTextAlignmentRight" | "PKTextAlignmentNatural";

	export interface standardFieldDictionary {
		attributedValue?:string | number;
		changeMessage?:string;
		dataDetectorTypes?:TdataDetector[];
		key:string;
		label?:string;
		textAlignment?:TtextAlignment;
		value:string | number;
	}

	export type TdateStyle = "PKDateStyleNone" | "PKDateStyleShort" | "PKDateStyleMedium" | "PKDateStyleLong" | "PKDateStyleFull";

	export interface dateFieldDictionary extends standardFieldDictionary {
		dateStyle:TdateStyle;
		ignoresTimeZone?:boolean;
		isRelative?:boolean;
		timeStyle:TdateStyle;
	}

	export type TnumberStyle = "PKNumberStyleDecimal" | "PKNumberStylePercent" | "PKNumberStyleScientific" | "PKNumberStyleSpellOut";

	export interface numberFieldDictionary extends standardFieldDictionary {
		numberStyle:TnumberStyle;
	}


	export type TfieldDictionaries = standardFieldDictionary | dateFieldDictionary | numberFieldDictionary;

	export type TupTo2fieldDictionaries = [TfieldDictionaries] | [TfieldDictionaries, TfieldDictionaries];
	export type TupTo3fieldDictionaries = TupTo2fieldDictionaries | [TfieldDictionaries, TfieldDictionaries, TfieldDictionaries];
	export type TupTo4fieldDictionaries = TupTo3fieldDictionaries | [TfieldDictionaries, TfieldDictionaries, TfieldDictionaries, TfieldDictionaries];
	export type TupTo5fieldDictionaries = TupTo4fieldDictionaries | [TfieldDictionaries, TfieldDictionaries, TfieldDictionaries, TfieldDictionaries, TfieldDictionaries];

	export interface passStructureDictionary {
		auxiliaryFields?:TupTo4fieldDictionaries;
		backFields?:TfieldDictionaries[];
		headerFields?:TupTo3fieldDictionaries;
		primaryFields?:[TfieldDictionaries];
		secondaryFields?:TupTo4fieldDictionaries;
	}

	export type TtransitType = "PKTransitTypeAir" |  "PKTransitTypeBoat" |  "PKTransitTypeBus" |  "PKTransitTypeGeneric" | "PKTransitTypeTrain";
	
	export interface boardingPassStructureDictionary extends passStructureDictionary {
		transitType:TtransitType;
		primaryFields?:TupTo2fieldDictionaries;
		auxiliaryFields?:TupTo5fieldDictionaries;
	}

	export interface beaconDictionary {
		major?:number;
		minor?:number;
		proximityUUID:string;
		relevantText?:string;
	}

	export interface locationDictionary {
		altitude?:number;
		latitude:number;
		longitude:number;
		relevantText?:string;
	}

	export type TbarcodeFormat = "PKBarcodeFormatQR" | "PKBarcodeFormatPDF417" |  "PKBarcodeFormatAztec" | "PKBarcodeFormatCode128";

	export interface barcodeDictionary {
		altText?:string;
		format: TbarcodeFormat;
		message:string;
		messageEncoding:"iso-8859-1" | string;
	}

	export interface nfcDictionary {
		message:string;
		encryptionPublicKey?:string;
	}

	//Boarding Pass
	export interface boardingPass extends unstylePassKitPackage {
		boardingPass:boardingPassStructureDictionary;
	}
	export type serviceableBoardingPass = boardingPass & webService;

	//Coupon
	export interface coupon extends unstylePassKitPackage {
		coupon:passStructureDictionary;
	}
	export type serviceableCoupon = coupon & webService;

	//Event Ticket
	export interface eventTicket extends unstylePassKitPackage {
		eventTicket:passStructureDictionary;
	}
	export type serviceableEventTicket = eventTicket & webService;

	//Generic
	export interface generic extends unstylePassKitPackage {
		generic:passStructureDictionary;
	}
	export type serviceableGeneric = generic & webService;

	//Store Card
	export interface storeCard extends unstylePassKitPackage {
		storeCard:passStructureDictionary;
	}
	export type serviceableStoreCard = storeCard & webService;
	
	
	
	export type TservicablePassStyles = serviceableBoardingPass | serviceableCoupon | serviceableEventTicket | serviceableGeneric | serviceableStoreCard;
	
	export type TunservicablePassStyles = boardingPass | coupon | eventTicket | generic | storeCard;

	export type TpassStyles = TservicablePassStyles | TunservicablePassStyles;

	export interface unstylePassKitPackage {
		
		//Standard Keys
		description:string;
		formatVersion:number;
		organizationName:string;
		passTypeIdentifier:string;
		serialNumber:string;
		teamIdentifier:string;
		
		//Associated App Keys
		appLaunchURL?:string;
		associatedStoreIdentifiers?:number[];
		
		//Companion App Keys
		userInfo?:any;
		
		//Expiration Keys
		expirationDate?:string;
		voided?:boolean;
		
		//Relevance Keys
		beacons?:beaconDictionary[];
		locations?:locationDictionary[];
		maxDistance?:number;
		relevantDate?:string;

		//Visual Appearance Keys
		barcode?:barcodeDictionary;
		barcodes?:barcodeDictionary[];
		backgroundColor?:string;
		foregroundColor?:string;
		groupingIdentifier?:string;
		labelColor?:string;
		logoText?:string;
		suppressStripShine?:boolean;

		//NFC-Enabled Pass Keys
		nfc?:nfcDictionary;
	}

	interface webService {
		
		//Web Service Keys
		authenticationToken:string;
		webServiceURL:string;
	}
}