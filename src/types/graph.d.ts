export const typeDefs = ["type GetChatResponse {\n  ok: Boolean\n  error: String\n  chat: Chat\n}\n\ntype Query {\n  GetChat(chatId: Int!): GetChatResponse!\n  GetMyPlaces: GetMyPlacesResponse!\n  GetNearbyRide: GetNearbyRideResponse!\n  GetRide(rideId: Int!): GetRideResponse!\n  GetMyProfile: GetMyProfileResponse!\n  GetNearbyDrivers: GetNearbyDriversResponse!\n  user: User\n  verification: Verification\n}\n\ntype SendChatMessageResponse {\n  ok: Boolean\n  error: String\n  message: Message\n}\n\ntype Mutation {\n  SendChatMessage(chatId: Int!, text: String!): SendChatMessageResponse!\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!, isFav: Boolean!): AddPlaceResponse!\n  DeletePlace(placeId: Int!): DeletePlaceResponse!\n  EditPlace(placeId: Int!, name: String, isFav: Boolean): EditPlaceResponse!\n  RequestRide(pickUpAddress: String!, pickUpLat: Float!, pickUpLng: Float!, dropOffAddress: String!, dropOffLat: Float!, dropOffLng: Float!, price: Float!, distance: String!, duration: String!): RequestRideResponse!\n  UpdateRideStatus(rideId: Int!, status: StatusOptions!): UpdateRideStatusResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstname: String!, lastname: String!, email: String!, password: String!, profilePhoto: String!, age: Int!, phoneNumber: String!): EmailSignUpResponse!\n  FacebookConnect(firstname: String!, lastname: String!, email: String, fbId: String!): FacebookConnectResponse\n  ReportMovement(orientation: Float, lastLat: Float, lastLng: Float): ReportMovementResponse!\n  RequestEmailVerification: RequestEmailVerificationResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  ToggleDrivingMode: ToggleDrivingModeResponse!\n  UpdateProfile(firstname: String!, lastname: String!, email: String!, password: String!, profilePhoto: String!, age: Int!): UpdateProfileResponse!\n}\n\ntype Chat {\n  id: Int!\n  messages: [Message]\n  passengerId: Int!\n  driverId: Int!\n  driver: User!\n  rideId: Int!\n  ride: Ride!\n  passenger: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: [Chat]!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPlaceResponse {\n  ok: Boolean\n  error: String\n}\n\ntype DeletePlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetMyPlacesResponse {\n  ok: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFav: Boolean!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetNearbyRideResponse {\n  ok: Boolean\n  error: String\n  ride: Ride\n}\n\ntype GetRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype Subscription {\n  NearbyRideSubscription: Ride\n  RideStatusSubscription: Ride\n  DriversSubscription: User\n}\n\ntype RequestRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype Ride {\n  id: Int!\n  status: String!\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOfLat: Float!\n  dropOffLng: Float!\n  price: Float!\n  distance: String!\n  duration: String!\n  passengerId: Int!\n  driverId: Int\n  driver: User\n  chat: Chat\n  chatId: Int\n  passenger: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UpdateRideStatusResponse {\n  ok: Boolean\n  error: String\n}\n\nenum StatusOptions {\n  ACCEPTED\n  FINISHED\n  CANCELED\n  REQUESTING\n  ONROUTE\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean\n  error: String\n  token: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean\n  user: User\n  error: String\n}\n\ntype GetNearbyDriversResponse {\n  ok: Boolean\n  error: String\n  drivers: [User]\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RequestEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstname: String!\n  lastname: String!\n  age: Int\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  fullName: String\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n  fbId: String\n  chatsAsDriver: [Chat]\n  chatsAsPassenger: [Chat]\n  messages: [Message]\n  ridesAsDriver: [Ride]\n  ridesAsPassenger: [Ride]\n  places: [Place]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean\n  error: String\n}\n\ntype ToggleDrivingModeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetChat: GetChatResponse;
  GetMyPlaces: GetMyPlacesResponse;
  GetNearbyRide: GetNearbyRideResponse;
  GetRide: GetRideResponse;
  GetMyProfile: GetMyProfileResponse;
  GetNearbyDrivers: GetNearbyDriversResponse;
  user: User | null;
  verification: Verification | null;
}

export interface GetChatQueryArgs {
  chatId: number;
}

export interface GetRideQueryArgs {
  rideId: number;
}

export interface GetChatResponse {
  ok: boolean | null;
  error: string | null;
  chat: Chat | null;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  passengerId: number;
  driverId: number;
  driver: User;
  rideId: number;
  ride: Ride;
  passenger: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Array<Chat>;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  firstname: string;
  lastname: string;
  age: number | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  fullName: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
  fbId: string | null;
  chatsAsDriver: Array<Chat> | null;
  chatsAsPassenger: Array<Chat> | null;
  messages: Array<Message> | null;
  ridesAsDriver: Array<Ride> | null;
  ridesAsPassenger: Array<Ride> | null;
  places: Array<Place> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Ride {
  id: number;
  status: string;
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOfLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
  passengerId: number;
  driverId: number | null;
  driver: User | null;
  chat: Chat | null;
  chatId: number | null;
  passenger: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetMyPlacesResponse {
  ok: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface GetNearbyRideResponse {
  ok: boolean | null;
  error: string | null;
  ride: Ride | null;
}

export interface GetRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface GetMyProfileResponse {
  ok: boolean | null;
  user: User | null;
  error: string | null;
}

export interface GetNearbyDriversResponse {
  ok: boolean | null;
  error: string | null;
  drivers: Array<User> | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  SendChatMessage: SendChatMessageResponse;
  AddPlace: AddPlaceResponse;
  DeletePlace: DeletePlaceResponse;
  EditPlace: EditPlaceResponse;
  RequestRide: RequestRideResponse;
  UpdateRideStatus: UpdateRideStatusResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse | null;
  ReportMovement: ReportMovementResponse;
  RequestEmailVerification: RequestEmailVerificationResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  ToggleDrivingMode: ToggleDrivingModeResponse;
  UpdateProfile: UpdateProfileResponse;
}

export interface SendChatMessageMutationArgs {
  chatId: number;
  text: string;
}

export interface AddPlaceMutationArgs {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

export interface DeletePlaceMutationArgs {
  placeId: number;
}

export interface EditPlaceMutationArgs {
  placeId: number;
  name: string | null;
  isFav: boolean | null;
}

export interface RequestRideMutationArgs {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
}

export interface UpdateRideStatusMutationArgs {
  rideId: number;
  status: StatusOptions;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: number;
  phoneNumber: string;
}

export interface FacebookConnectMutationArgs {
  firstname: string;
  lastname: string;
  email: string | null;
  fbId: string;
}

export interface ReportMovementMutationArgs {
  orientation: number | null;
  lastLat: number | null;
  lastLng: number | null;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateProfileMutationArgs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: number;
}

export interface SendChatMessageResponse {
  ok: boolean | null;
  error: string | null;
  message: Message | null;
}

export interface AddPlaceResponse {
  ok: boolean | null;
  error: string | null;
}

export interface DeletePlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface EditPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export type StatusOptions = "ACCEPTED" | "FINISHED" | "CANCELED" | "REQUESTING" | "ONROUTE";

export interface UpdateRideStatusResponse {
  ok: boolean | null;
  error: string | null;
}

export interface CompleteEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean | null;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  ok: boolean | null;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean | null;
  error: string | null;
  token: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface ReportMovementResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean | null;
  error: string | null;
}

export interface ToggleDrivingModeResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  NearbyRideSubscription: Ride | null;
  RideStatusSubscription: Ride | null;
  DriversSubscription: User | null;
}
