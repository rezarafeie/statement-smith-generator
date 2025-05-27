
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, User } from 'lucide-react';
import { UserDetails } from '../utils/dataGenerator';

interface CustomDataFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<UserDetails> & { initialBalance?: string }) => void;
}

export const CustomDataForm: React.FC<CustomDataFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    accountNumber: '',
    statementPeriod: '',
    initialBalance: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert form data to UserDetails format with initialBalance included
    const userData: Partial<UserDetails> & { initialBalance?: string } = {
      name: formData.name || undefined,
      address: formData.address || undefined,
      accountNumber: formData.accountNumber || undefined,
      statementPeriod: formData.statementPeriod || undefined,
      initialBalance: formData.initialBalance || undefined
    };

    onSubmit(userData);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      address: '',
      accountNumber: '',
      statementPeriod: '',
      initialBalance: ''
    });
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
              <Label htmlFor="address" className="text-gray-300">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Leave empty for random generation"
                rows={3}
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
              <Label htmlFor="statementPeriod" className="text-gray-300">Statement Period</Label>
              <Input
                id="statementPeriod"
                type="text"
                value={formData.statementPeriod}
                onChange={(e) => handleChange('statementPeriod', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="e.g., 01/01/2024 to 31/01/2024"
              />
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
