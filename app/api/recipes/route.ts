import { writeFileSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { formatData } from '@/utils/formatData'
import { BASE_URL } from '@/utils/constants'

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_KEY
const BASE_PARAMS = `&number=3&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true&sort=meta-score`

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ingredients = searchParams.get('ingredients')

  if (!ingredients) {
    return NextResponse.json(
      { error: 'Ingredients parameter is required' },
      { status: 400 }
    )
  }

  try {
    const { data } = await axios.get(
      `${BASE_URL}/complexSearch?apiKey=${API_KEY}&includeIngredients=${ingredients}${BASE_PARAMS}`
    )
    return NextResponse.json(formatData(data.results))
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching recipes' },
      { status: 500 }
    )
  }
}