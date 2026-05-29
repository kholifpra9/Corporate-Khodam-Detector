'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from './LoadingSpinner';
import { JOB_ROLES } from '@/types';
import type { JobRole } from '@/types';

interface KhodamFormProps {
  onGenerate: (name: string, role: JobRole) => void;
  loading?: boolean;
}

export function KhodamForm({ onGenerate, loading = false }: KhodamFormProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<JobRole | ''>('');
  const [errors, setErrors] = useState<{ name?: string; role?: string }>({});

  function validate(): boolean {
    const newErrors: { name?: string; role?: string } = {};
    if (!name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (!role) newErrors.role = 'Pilih role pekerjaan';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onGenerate(name.trim(), role as JobRole);
  }

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <Input
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={errors.name}
          maxLength={100}
        />
        <span className="absolute right-3 bottom-2.5 text-[10px] text-gray-400 font-mono">
          {name.length}/100
        </span>
      </div>

      <Select
        label="Role Pekerjaan"
        options={JOB_ROLES}
        placeholder="Pilih role pekerjaan..."
        value={role}
        onChange={(e) => {
          setRole(e.target.value as JobRole | '');
          if (errors.role) setErrors((prev) => ({ ...prev, role: undefined }));
        }}
        error={errors.role}
      />

      <Button type="submit" size="lg" className="w-full">
        🔮 Cek Khodam
      </Button>
    </form>
  );
}
