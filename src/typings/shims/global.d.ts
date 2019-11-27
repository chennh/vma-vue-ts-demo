declare interface Resolve {
  (data?: any): void
}

declare interface Reject {
  (e: Error): void
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
