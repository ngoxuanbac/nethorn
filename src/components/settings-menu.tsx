"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Settings } from "lucide-react";
import { useLanguage } from "./languageContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SettingsMenu() {
  const [volume, setVolume] = useState(0);
  const { t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-8 h-8 rounded-full text-blue-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white text-blue-900 border-blue-200">
        <DropdownMenuLabel>{t.settings}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex flex-col items-start gap-2 hover:!text-blue-600"
          onSelect={(e) => e.preventDefault()}
        >
          <span className="text-sm font-medium">{t.volume}</span>
          <div className="flex items-center gap-2 w-full">
            {volume === 0 ? (
              <VolumeX className="w-4 h-4 text-blue-600" />
            ) : (
              <Volume2 className="w-4 h-4 text-blue-600" />
            )}
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(val: number[]) => setVolume(val[0] / 100)}
              className="w-full !border-none"
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
