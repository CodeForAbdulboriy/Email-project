import { JwtPayload } from "jsonwebtoken";

export interface authPayload extends JwtPayload {
    id: string
}