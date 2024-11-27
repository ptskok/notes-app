import { validateEmail, validateName, validatePassword, getInitials } from "../utils/helper.js";

describe("Helper Functions", () => {
    describe("validateEmail", () => {
        test("returns an error if email is empty", () => {
            expect(validateEmail("")).toEqual({ valid: false, error: "Email is required" });
        });

        test("returns an error if email has an invalid format", () => {
            expect(validateEmail("invalid-email")).toEqual({ valid: false, error: "Invalid Email format" });
        });

        test("returns valid if email has a correct format", () => {
            expect(validateEmail("test@example.com")).toEqual({ valid: true });
        });
    });

    describe("validateName", () => {
        test("returns an error if name is empty", () => {
            expect(validateName("")).toEqual({ valid: false, error: "Name is required" });
        });

        test("returns an error if name has invalid characters", () => {
            expect(validateName("John123")).toEqual({ valid: false, error: "Invalid Name format" });
        });

        test("returns valid if name has a correct format", () => {
            expect(validateName("John Doe")).toEqual({ valid: true });
        });

        test("handles single names correctly", () => {
            expect(validateName("John")).toEqual({ valid: true });
        });
    });

    describe("validatePassword", () => {
        test("returns an error if password is empty", () => {
            expect(validatePassword("")).toEqual({ valid: false, error: "Password is required" });
        });

        test("returns an error if password has no uppercase letter", () => {
            expect(validatePassword("password1!")).toEqual({ valid: false, error: "Password must include atleast one Uppercase letter" });
        });

        test("returns an error if password has no lowercase letter", () => {
            expect(validatePassword("PASSWORD1!")).toEqual({ valid: false, error: "Password must include atleast one Lower letter" });
        });

        test("returns an error if password has no special character", () => {
            expect(validatePassword("Password1")).toEqual({ valid: false, error: "Password must include atleast one special character" });
        });

        test("returns an error if password length is less than 8", () => {
            expect(validatePassword("Pass1!")).toEqual({ valid: false, error: "Min password length should be 8" });
        });

        test("returns valid if password meets all criteria", () => {
            expect(validatePassword("Password1!")).toEqual({ valid: true });
        });
    });

    describe("getInitials", () => {
        test("returns empty string if name is empty", () => {
            expect(getInitials("")).toBe("");
        });

        test("returns initials for a single word name", () => {
            expect(getInitials("John")).toBe("J");
        });

        test("returns initials for a two-word name", () => {
            expect(getInitials("John Doe")).toBe("JD");
        });
    });
});