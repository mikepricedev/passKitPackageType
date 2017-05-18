declare module "passkitpackagev1" {

	export type TdataDetector = "PKDataDetectorTypePhoneNumber" | "PKDataDetectorTypeLink" | "PKDataDetectorTypeAddress" | "PKDataDetectorTypeCalendarEvent";

	export type TtextAlignment = "PKTextAlignmentLeft" | "PKTextAlignmentCenter" | "PKTextAlignmentRight" | "PKTextAlignmentNatural";

	export interface IstandardFieldDictionary {
		attributedValue?:string | number;
		changeMessage?:string;
		dataDetectorTypes?:TdataDetector[];
		key:string;
		label?:string;
		textAlignment?:TtextAlignment;
		value:string | number;
	}

	export type TdateStyle = "PKDateStyleNone" | "PKDateStyleShort" | "PKDateStyleMedium" | "PKDateStyleLong" | "PKDateStyleFull";

	export interface IdateFieldDictionary extends IstandardFieldDictionary {
		dateStyle:TdateStyle;
		ignoresTimeZone?:boolean;
		isRelative?:boolean;
		timeStyle:TdateStyle;
	}

	export type TnumberStyle = "PKNumberStyleDecimal" | "PKNumberStylePercent" | "PKNumberStyleScientific" | "PKNumberStyleSpellOut";

	export interface InumberFieldDictionary extends IstandardFieldDictionary {
		numberStyle:TnumberStyle;
	}


	export type IfieldDictionaries = IstandardFieldDictionary | IdateFieldDictionary | InumberFieldDictionary;

	export type TupTo2fieldDictionaries = [IfieldDictionaries] | [IfieldDictionaries, IfieldDictionaries];
	export type TupTo3fieldDictionaries = TupTo2fieldDictionaries | [IfieldDictionaries, IfieldDictionaries, IfieldDictionaries];
	export type TupTo4fieldDictionaries = TupTo3fieldDictionaries | [IfieldDictionaries, IfieldDictionaries, IfieldDictionaries, IfieldDictionaries];
	export type TupTo5fieldDictionaries = TupTo4fieldDictionaries | [IfieldDictionaries, IfieldDictionaries, IfieldDictionaries, IfieldDictionaries, IfieldDictionaries];

	export interface IpassStructureDictionary {
		auxiliaryFields?:TupTo4fieldDictionaries;
		backFields?:IfieldDictionaries[];
		headerFields?:TupTo3fieldDictionaries;
		primaryFields?:[IfieldDictionaries];
		secondaryFields?:TupTo4fieldDictionaries;
	}

	export type TtransitType = "PKTransitTypeAir" |  "PKTransitTypeBoat" |  "PKTransitTypeBus" |  "PKTransitTypeGeneric" | "PKTransitTypeTrain";
	
	export interface IboardingPassStructureDictionary extends IpassStructureDictionary {
		transitType:TtransitType;
		primaryFields?:TupTo2fieldDictionaries;
		auxiliaryFields?:TupTo5fieldDictionaries;
	}

	export interface IbeaconDictionary {
		major?:number;
		minor?:number;
		proximityUUID:string;
		relevantText?:string;
	}

	export interface IlocationDictionary {
		altitude?:number;
		latitude:number;
		longitude:number;
		relevantText?:string;
	}

	export type TbarcodeFormat = "PKBarcodeFormatQR" | "PKBarcodeFormatPDF417" |  "PKBarcodeFormatAztec" | "PKBarcodeFormatCode128";

	export interface IbarcodeDictionary {
		altText?:string;
		format: TbarcodeFormat;
		message:string;
		messageEncoding:"iso-8859-1" | string;
	}

	export interface InfcDictionary {
		message:string;
		encryptionPublicKey?:string;
	}

	//Boarding Pass
	export interface IboardingPass extends IunstylePassKitPackage {
		IboardingPass:IboardingPassStructureDictionary;
	}
	export type IserviceableBoardingPass = IboardingPass & IwebService;

	//Coupon
	export interface Icoupon extends IunstylePassKitPackage {
		coupon:IpassStructureDictionary;
	}
	export type IserviceableCoupon = Icoupon & IwebService;

	//Event Ticket
	export interface IeventTicket extends IunstylePassKitPackage {
		eventTicket:IpassStructureDictionary;
	}
	export type IserviceableEventTicket = IeventTicket & IwebService;

	//Generic
	export interface Igeneric extends IunstylePassKitPackage {
		generic:IpassStructureDictionary;
	}
	export type IserviceableGeneric = Igeneric & IwebService;

	//Store Card
	export interface IstoreCard extends IunstylePassKitPackage {
		storeCard:IpassStructureDictionary;
	}
	export type IserviceableStoreCard = IstoreCard & IwebService;
	
	
	
	export type IservicablePassStyles = IserviceableBoardingPass | IserviceableCoupon | IserviceableEventTicket | IserviceableGeneric | IserviceableStoreCard;
	
	export type IunservicablePassStyles = IboardingPass | Icoupon | IeventTicket | Igeneric | IstoreCard;

	export type TpassStyles = IservicablePassStyles | IunservicablePassStyles;

	export interface IunstylePassKitPackage {
		
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
		beacons?:IbeaconDictionary[];
		locations?:IlocationDictionary[];
		maxDistance?:number;
		relevantDate?:string;

		//Visual Appearance Keys
		barcode?:IbarcodeDictionary;
		barcodes?:IbarcodeDictionary[];
		backgroundColor?:string;
		foregroundColor?:string;
		groupingIdentifier?:string;
		labelColor?:string;
		logoText?:string;
		suppressStripShine?:boolean;

		//NFC-Enabled Pass Keys
		nfc?:InfcDictionary;
	}

	interface IwebService {
		
		//Web Service Keys
		authenticationToken:string;
		webServiceURL:string;
	}
}