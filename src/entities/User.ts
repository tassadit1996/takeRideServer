import { IsEmail } from "class-validator";
import bcrypt from "bcrypt";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Verification from "./Verification";
import Ride from "./Ride";
const BYCRYPT_ROUND = 10
@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "text", unique: true })
    @IsEmail()
    email: string;

    @Column({ type: "text", default: false })
    verifiedEmail: boolean;

    @Column({ type: "text" })
    firstname: string;

    @Column({ type: "text" })
    lastname: string;

    @Column({ type: "int" })
    age: number;

    @Column({ type: "text" })
    password: string

    @Column({ type: "text" })
    phoneNumber: string;

    @Column({ type: "boolean", default: false })
    verifiedPhoneNumber: boolean;

    @Column({ type: "text" })
    profilePhoto: string;

    @Column({ type: "boolean", default: false })
    isDriving: boolean;

    @Column({ type: "boolean", default: false })
    isRiding: boolean;

    @Column({ type: "boolean", default: false })
    isTaken: boolean;

    @Column({ type: "double precision", default: 0 })
    lastLng: number;

    @Column({ type: "double precision", default: 0 })
    lastLat: number;

    @Column({ type: "double precision", default: 0 })
    lastOrientation: number;

    @ManyToOne(type => Chat, chat => chat.participants)
    chat: Chat;

    @OneToMany(type => Message, message => message.user)
    messages: Message[];

    @OneToMany(type => Verification, verification => verification.user)
    verifications: Verification[];

    @OneToMany(type => Ride, ride => ride.driver)
    ridesAsDriver: Ride[];

    @OneToMany(type => Ride, ride => ride.passenger)
    ridesAsPassenger: Ride[];

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

    get fullName() {
        return `${this.firstname} ${this.lastname}`
    };

    public comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password)
    }

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword(): Promise<void> {
        const hashedPassword = await this.hashedPassword(this.password)
        this.password = hashedPassword
    }

    private hashedPassword(password: string): Promise<string> {
        return bcrypt.hash(password, BYCRYPT_ROUND)
    }

}
export default User;