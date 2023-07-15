import styled from 'styled-components'

export const ImageContainer = styled.div`
	position: relative;
	min-width: 12.5rem;
	min-height: 12.5rem;
	border-radius: 15px;
	overflow: hidden;
	transform-origin: center;

	.image {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.desc {
		position: absolute;
		width: 100%;
		height: 100%;
		color: white;
		display: flex;
		flex-direction: column;
		padding-left: 0.7rem;
		padding-top: 0.35rem;
		opacity: 0;
	}

	span {
		color: var(--gray-400);
	}

	.desc ul {
		list-style: none;
	}

	&:hover .image {
		filter: blur(2px) brightness(0.5);
		transition: 500ms;
	}

	&:hover .desc {
		opacity: 1;
		transition: 500ms;
	}
`
