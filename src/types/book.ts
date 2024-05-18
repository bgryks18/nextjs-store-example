export interface Volume {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: {
    title: string
    authors: string[]
    publisher: string
    publishedDate: string
    description: string
    industryIdentifiers: {
      type: 'ISBN_13'
      identifier: '9780080478050'
    }[]
    readingModes: {
      text: boolean
      image: boolean
    }
    pageCount: number
    printType: 'BOOK' | 'MAGAZINE' | 'ALL' | string
    categories?: string[]
    averageRating: number
    ratingsCount: number
    maturityRating: string
    allowAnonLogging: boolean
    contentVersion: string
    panelizationSummary: {
      containsEpubBubbles: boolean
      containsImageBubbles: boolean
    }
    imageLinks?: {
      smallThumbnail: string
      thumbnail: string
    }
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
  }
  saleInfo: {
    country: string
    saleability: 'FOR_SALE' | 'FREE' | string
    isEbook: boolean
    listPrice?: {
      amount: number
      currencyCode: 'USD' | 'TRY' | string
    }
    retailPrice?: {
      amount: number
      currencyCode: 'USD' | 'TRY' | string
    }
    buyLink: string
    offers?: [
      {
        finskyOfferType: number
        listPrice: {
          amountInMicros: number
          currencyCode: 'USD' | 'TRY' | string
        }
        retailPrice: {
          amountInMicros: number
          currencyCode: 'USD' | 'TRY' | string
        }
        giftable: boolean
      }
    ]
  }
  accessInfo: {
    country: string
    viewability: string
    embeddable: boolean
    publicDomain: boolean
    textToSpeechPermission: 'ALLOWED' | 'ALLOWED_FOR_ACCESSIBILITY' | string
    epub: {
      isAvailable: boolean
    }
    pdf: {
      isAvailable: boolean
      acsTokenLink: string
    }
    webReaderLink: string
    accessViewStatus: string
    quoteSharingAllowed: boolean
  }
  searchInfo: {
    textSnippet: string
  }
}

export interface VolumeListResponse {
  kind: string
  totalItems: number
  items?: Volume[]
}
