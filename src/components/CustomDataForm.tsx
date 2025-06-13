
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { X, User, CalendarIcon } from 'lucide-react';
import { UserDetails } from '../utils/dataGenerator';
import { format } from 'date-fns';

interface CustomDataFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<UserDetails> & { initialBalance?: string; phoneNumber?: string; city?: string; fullAddress?: string; postcode?: string; country?: string }) => void;
}

export const CustomDataForm: React.FC<CustomDataFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    fullAddress: '',
    postcode: '',
    country: '',
    accountNumber: '',
    statementPeriod: '',
    initialBalance: '',
    phoneNumber: ''
  });

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate statement period from dates if selected
    let statementPeriod = formData.statementPeriod;
    if (startDate && endDate) {
      const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const suffix = day.toString().endsWith('1') && day !== 11 ? 'st' : 
                     day.toString().endsWith('2') && day !== 12 ? 'nd' : 
                     day.toString().endsWith('3') && day !== 13 ? 'rd' : 'th';
        return `${day}${suffix} ${month}. ${year}`;
      };
      statementPeriod = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    
    // Only include fields that have actual values (not empty strings)
    const userData: Partial<UserDetails> & { initialBalance?: string; phoneNumber?: string; city?: string; fullAddress?: string; postcode?: string; country?: string } = {};
    
    if (formData.name.trim()) userData.name = formData.name.trim();
    if (formData.address.trim()) userData.address = formData.address.trim();
    if (formData.city.trim()) userData.city = formData.city.trim();
    if (formData.fullAddress.trim()) userData.fullAddress = formData.fullAddress.trim();
    if (formData.postcode.trim()) userData.postcode = formData.postcode.trim();
    if (formData.country.trim()) userData.country = formData.country.trim();
    if (formData.accountNumber.trim()) userData.accountNumber = formData.accountNumber.trim();
    if (statementPeriod.trim()) userData.statementPeriod = statementPeriod.trim();
    if (formData.initialBalance.trim()) userData.initialBalance = formData.initialBalance.trim();
    if (formData.phoneNumber.trim()) userData.phoneNumber = formData.phoneNumber.trim();

    onSubmit(userData);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      address: '',
      city: '',
      fullAddress: '',
      postcode: '',
      country: '',
      accountNumber: '',
      statementPeriod: '',
      initialBalance: '',
      phoneNumber: ''
    });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-800 border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="h-5 w-5" />
              Custom Statement Data
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Leave empty for random generation"
              />
            </div>

            <div>
              <Label htmlFor="fullAddress" className="text-gray-300">Full Address</Label>
              <Textarea
                id="fullAddress"
                value={formData.fullAddress}
                onChange={(e) => handleChange('fullAddress', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="e.g., 123 High Street, Apartment 4B"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="city" className="text-gray-300">City</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="e.g., London"
              />
            </div>

            <div>
              <Label htmlFor="postcode" className="text-gray-300">Postcode</Label>
              <Input
                id="postcode"
                type="text"
                value={formData.postcode}
                onChange={(e) => handleChange('postcode', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="e.g., SW1A 1AA"
              />
            </div>

            <div>
              <Label htmlFor="country" className="text-gray-300">Country</Label>
              <Input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="e.g., United Kingdom, Spain"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-gray-300">Legacy Address (Optional)</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="For backward compatibility"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-gray-300">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="e.g., +447123456789"
              />
            </div>

            <div>
              <Label htmlFor="accountNumber" className="text-gray-300">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Leave empty for random generation"
              />
            </div>

            <div>
              <Label className="text-gray-300">Statement Period</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Popover open={showStartCalendar} onOpenChange={setShowStartCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PP") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date);
                        setShowStartCalendar(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover open={showEndCalendar} onOpenChange={setShowEndCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PP") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        setEndDate(date);
                        setShowEndCalendar(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="mt-2">
                <Input
                  type="text"
                  value={formData.statementPeriod}
                  onChange={(e) => handleChange('statementPeriod', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Or type manually: e.g., 1st Jan. 2024 - 31st Jan. 2024"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="initialBalance" className="text-gray-300">Initial Balance (£)</Label>
              <Input
                id="initialBalance"
                type="number"
                step="0.01"
                value={formData.initialBalance}
                onChange={(e) => handleChange('initialBalance', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Leave empty for random generation"
              />
            </div>

            <div className="text-xs text-gray-400 mt-4">
              <p>Any empty fields will be automatically filled with realistic random data.</p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Generate Statement
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
