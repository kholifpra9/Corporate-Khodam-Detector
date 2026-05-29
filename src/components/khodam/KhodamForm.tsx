'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Nama Lengkap"
        placeholder="Masukkan nama lengkap..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />

      <Select
        label="Role Pekerjaan"
        options={JOB_ROLES}
        placeholder="Pilih role pekerjaan..."
        value={role}
        onChange={(e) => setRole(e.target.value as JobRole | '')}
        error={errors.role}
      />

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? 'Memanggil khodam...' : '🔮 Cek Khodam'}
      </Button>
    </form>
  );
}
