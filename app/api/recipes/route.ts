import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { formatData } from '@/utils/formatData'
import { API_KEY, BASE_URL } from '@/utils/constants'
import { encrypt } from '@/utils/crypto'

const BASE_PARAMS = `&number=5&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true&sort=meta-score`

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
    const formattedData = formatData(data.results)
    const encryptedData = encrypt(JSON.stringify(formattedData))
    return NextResponse.json({ data: encryptedData })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching recipes' },
      { status: 500 }
    )
  }
}