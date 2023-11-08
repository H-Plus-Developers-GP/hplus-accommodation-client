import { MainSearchModel } from '@/schema/main-search-schema';
import React from 'react'
import Input from './Form/Input';
import Select from './Form/Select';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'

const adTypeOptions = [{ label: "Buy", value: "Buy" }, { label: "Rent", value: "Rent" }];

type Props = {
    locations: Array<{ label: string, value: string, townships: Array<{ label: string, value: string }> }>,
    propertyTypes: Array<{ label: string, value: string }>,
    register: UseFormRegister<MainSearchModel>,
    errors: FieldErrors<MainSearchModel>,
    watch: UseFormWatch<MainSearchModel>
}

const MainSearchForm: React.FC<Props> = ({ locations, propertyTypes, register, errors, watch }) => {

    return (
        <div className="bg-gray-600 rounded-sm p-4 my-20 sm:mx-2 md:mx-20 xl:mx-40">
            <div className='flex max-md:flex-col max-md:items-stretch items-center justify-stretch gap-2'>
                <div className="flex-1">
                    <Select id='adType' name='adType' label='Rent or Buy' options={adTypeOptions} register={register} required={true} error={errors?.adType?.message || ""} placeholder='Rent or Buy' disabled={false} />
                </div>
                <div className="flex-1">
                    <Select id='state' name='state' label='Select State' options={locations || []} register={register} required={false} error={errors?.state?.message || ""} placeholder='Select State' disabled={false} />
                </div>
                <div className="flex-1">
                    <Select id='township' name='township' label='Select Township' options={locations?.find(ld => ld.value === watch("state"))?.townships || []} register={register} required={false} error={errors?.township?.message || ""} placeholder='Select Township' disabled={watch("state") === ""} />
                </div>
                <div className="flex-1">
                    <Select id='propertyType' name='propertyType' label='Type of Property' options={propertyTypes} register={register} required={false} error={errors?.propertyType?.message || ""} placeholder='Select Property Type' disabled={false} />
                </div>
            </div>
            <div className='flex max-md:flex-col max-md:items-stretch items-center justify-stretch gap-2'>
                <div className="flex-1">
                    <Input id='minPrice' name='minPrice' label='Minimum Price' register={register} required={false} error={errors?.minPrice?.message || ""} placeholder='Enter Min Price' disabled={false} type='number' />
                </div>
                <div className="flex-1">
                    <Input id='maxPrice' name='maxPrice' label='Maximum Price' register={register} required={false} error={errors?.maxPrice?.message || ""} placeholder='Enter Max Price' disabled={false} type='number' />
                </div>
                <div className="flex-1">
                </div>
                <div className="flex-1">
                    <button type='submit' className='w-full bg-sky-600 rounded-sm p-2.5 text-white'>Search</button>
                </div>
            </div>
        </div>
    )
}

export default MainSearchForm