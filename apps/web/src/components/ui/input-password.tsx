import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Importa el Input original de shadcn
import { Button } from "@/components/ui/button"; // Importa el Button de shadcn
import { Eye, EyeOff } from "lucide-react"; // Asegúrate de tener lucide-react instalado


const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = showPassword ? "text" : "password";

    return (
      <div className="relative">
        <Input
          type={inputType}
          className={className} // Pasa el className recibido
          ref={ref}
          {...props} // Pasa todas las demás propiedades
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };